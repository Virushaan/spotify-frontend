import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../spotify-service.service';

interface Hash {
  access_token: string;
  token_type: string;
  expires_in: string;
  state: string;
}

@Component({
  selector: 'app-generate-playlist',
  templateUrl: './generate-playlist.component.html',
  styleUrls: ['./generate-playlist.component.scss']
})
export class GeneratePlaylistComponent implements OnInit {
  private hashes: Partial<Hash> = {}
  private userId: string;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly spotifyService: SpotifyService
  ) { }

  ngOnInit() {
    this.route.fragment.subscribe((fragment: string) => {
      fragment.split('&')
        .map(value => {
          const pair = value.split('=');
          this.hashes[pair[0]] = pair[1];
        });
      this.getUserId(this.hashes.access_token);
      console.log(this.hashes);
    });
  }

  public async getUserId(authToken) {
    const response = await this.spotifyService.getUserId(authToken);
    this.userId = (response as any).id;
    this.createPlaylist();
  }

  public async createPlaylist() {
    const response = await this.spotifyService.createSpotifyPlaylist(this.userId, 'testPlaylist', this.hashes.access_token);
    console.log('created playlist', response);
    this.addSongs((response as any).id);
  }

  public async addSongs(playlistId: string) {
    const [playlistCode, thresholdStr] = this.hashes.state.split(',');
    const threshold = parseInt(thresholdStr, 10);
    const playlist = await this.spotifyService.getPlaylist(playlistCode) as any;
    const uris = playlist.songs.map(arg => ({
      id: arg.id,
      votes: parseInt(arg.votes, 10)
    })).filter(song => song.votes >= threshold).map(song => "spotify:track:" + song.id);
    console.log('Adding:', uris);
    const response = await this.spotifyService.addSongsToPlaylist(playlistId, this.hashes.access_token, uris);
    console.log(response);
  }

}
