import { Component } from '@angular/core';
import { SpotifyService } from '../spotify-service.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent {

  public title = 'spotify-frontend';

  public songList = [
    'https://open.spotify.com/embed/track/5cLsaLcjPm6wpBW5tfcZHc',
    'https://open.spotify.com/embed/track/4XKkXLePJKajib3Mo4PKYV',
    'https://open.spotify.com/embed/track/2S2laN33BdttxJ8yyv4VbX',
    'https://open.spotify.com/embed/track/7yGUFMHTVa71SBBhDWjZ46',
    'https://open.spotify.com/embed/track/6ae29ZzSPYq61ARnOn3CGh',
    'https://open.spotify.com/embed/track/1rO0GXOh1xltnCEe1pd212',
    'https://open.spotify.com/embed/track/4t2FXUS8Nr7NvdNNvczBD6',
    'https://open.spotify.com/embed/track/5DXA8k2A3hEQG3zaqHBUzq',
    'https://open.spotify.com/embed/track/7bdYxWPCs46dQ0XLwySOyv',
    'https://open.spotify.com/embed/track/0OgGn1ofaj55l2PcihQQGV'
  ];

  constructor (private readonly spotifyService: SpotifyService) {
  }

  public updateThreshold(newThreshold) {
    console.log(newThreshold)
  }

  public test() {
    console.log('test');
    this.spotifyService.createPlaylist();
  }

}
