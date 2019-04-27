import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

const apiUrl = 'http://d33f25c4.ngrok.io';
const spotifyUrl = 'https://accounts.spotify.com';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  onVote = new Subject();

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

  public getApiToken(playlistId: string) {
    const body = new URLSearchParams();
    return this.http.post(`${spotifyUrl}/authorize`, {
      params: {
        client_id: 'd9682bef66264be29d0a69b1b9ce81f1',
        response_type: 'token',
        redirect_uri: window.location.href,
        state: playlistId,
      },
    });
  }
}
