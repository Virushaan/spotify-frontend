import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const apiUrl = 'http://7a3e0a49.ngrok.io';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }

  public async createPlaylist() {
    const playlistId = await this.http.post(`${apiUrl}/create`, {}).toPromise();
    console.log(playlistId);
  }
}
