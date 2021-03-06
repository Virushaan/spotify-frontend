import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

const apiUrl = 'http://localhost:5000';
const spotifyUrl = 'https://api.spotify.com';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  onVote = new Subject();

  private showSource = new BehaviorSubject('default message');
  public showCard = this.showSource.asObservable();

  private hideSource = new BehaviorSubject('default message');
  public hideCard = this.hideSource.asObservable();

  showNewCard(message: string) {
    this.showSource.next(message);
  }

  hideNewCard(message: string) {
    this.hideSource.next(message);
  }


  constructor(private http: HttpClient) { }

  public async createPlaylist(playlistName: string) {
    return await this.http.post(`${apiUrl}/create`, {
      name: playlistName
    }).toPromise();
  }

  public async vote(playlistId: string, songId: string) {
    await this.http.post(`${apiUrl}/vote`,
      {
        playlist: playlistId,
        song: songId
      },
      {responseType: 'text'}
    ).toPromise();
  }

  public async search(query: string): Promise<any> {
    return this.http.get(`${apiUrl}/spotify/search`, {params: {query}}).toPromise();
  }

  public async getPlaylist(playlistId: string) {
    return this.http.get(`${apiUrl}/songs`, {params: {playlist: playlistId}}).toPromise();
  }

  public getVoteStream(playlistId: string) {
    const source = new EventSource(`${apiUrl}/stream?playlist=${playlistId}`);
    source.onmessage = (arg) => {
      this.onVote.next(arg.data);
    };
  }

  public async getApiToken(playlistId: string) {
    const body = new URLSearchParams();
    return this.http.post(`${spotifyUrl}/authorize`, {
      params: {
        client_id: 'd9682bef66264be29d0a69b1b9ce81f1',
        response_type: 'token',
        redirect_uri: 'http://localhost:4200/generate/playlist',
        state: playlistId,
        scope: 'playlist-modify-public'
      },
    }).toPromise();
  }

  public async getUserId(authToken: string) {
    return this.http.get(`${spotifyUrl}/v1/me`, {headers: {
      Authorization: `Bearer ${authToken}`
    }}).toPromise();
  }

  public async createSpotifyPlaylist(userId, playlistName, authToken) {
    return this.http.post(`${spotifyUrl}/v1/users/${userId}/playlists`, {
      name: playlistName
    }, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }).toPromise();
  }

  public async addSongsToPlaylist(playlistId, authToken, uris) {
    return this.http.post(`${spotifyUrl}/v1/playlists/${playlistId}/tracks`, {}, {
      params: {
        uris: uris.join(',')
      },
      headers: {
        Authorization: `Bearer ${authToken}`
      },
    }).toPromise();
  }
}
