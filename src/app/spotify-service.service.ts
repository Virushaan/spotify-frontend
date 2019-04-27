import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SongSuggestion } from './components/search-song/search-song.component';

const apiUrl = 'http://box.drafly.net:8000';

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
    const voted = await this.http.post(`${apiUrl}/vote`, {
      playlist: playlistId,
      song: songId
    },
    {responseType: 'text'}
    ).toPromise();
    console.log('voted', voted);
  }

  public async search(query: string): Promise<any> {
    return this.http.post(`${apiUrl}/spotify/search`, {query}).toPromise();
  }
}
