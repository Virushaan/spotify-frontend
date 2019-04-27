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
    '5cLsaLcjPm6wpBW5tfcZHc',
    '4XKkXLePJKajib3Mo4PKYV',
    '2S2laN33BdttxJ8yyv4VbX',
    '7yGUFMHTVa71SBBhDWjZ46',
    '6ae29ZzSPYq61ARnOn3CGh',
    '1rO0GXOh1xltnCEe1pd212',
    '4t2FXUS8Nr7NvdNNvczBD6',
    '5DXA8k2A3hEQG3zaqHBUzq',
    '7bdYxWPCs46dQ0XLwySOyv',
    '0OgGn1ofaj55l2PcihQQGV'
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
