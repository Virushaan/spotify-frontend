import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const apiUrl = 'https://box.drafly.net:8000';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }

  public async createPlaylist() {
    const playlistId = await this.http.post(`${apiUrl}/create`, {}).toPromise();
    console.log(playlistId);
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
}
