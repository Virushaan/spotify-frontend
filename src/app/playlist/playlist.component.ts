import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../spotify-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

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

  constructor(
    private readonly spotifyService: SpotifyService,
    private readonly router: Router
  ) { }

  ngOnInit() {
    const playlistId = this.router.url.substr(1);
    this.spotifyService.getVoteStream(playlistId);
    this.populateSongList();
  }

  private async populateSongList() {
    const playlistId = this.router.url.substr(1);
    const newSongObj = await this.spotifyService.getPlaylist(playlistId) as any;
    const newSongs = newSongObj.songs.map(arg => arg.id);
    console.log('new songs', newSongs);
    this.songList = [...newSongs, ...this.songList];
  }

  public updateThreshold(newThreshold) {
    console.log(newThreshold);
  }

  public test() {
    console.log('test');
    // this.spotifyService.createPlaylist();
  }

}
