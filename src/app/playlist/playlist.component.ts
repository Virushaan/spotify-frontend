import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../spotify-service.service';
import { Router } from '@angular/router';

export interface SongItem {
  id: string;
  vote: number;
}

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})

export class PlaylistComponent implements OnInit {

  public title = 'spotify-frontend';

  public songList: SongItem[] = [];
  public playlistId = this.router.url.substr(1);

  constructor(
    private readonly spotifyService: SpotifyService,
    private readonly router: Router
  ) { }

  ngOnInit() {
    const playlistId = this.router.url.substr(1);
    this.spotifyService.getVoteStream(playlistId);
    this.populateSongList();
    this.spotifyService.onVote.subscribe(vote => {
      const newSongId = vote as string;
      console.log('home', vote);
      if (this.songList.findIndex(arg => arg.id === newSongId) === -1) {
        this.addToSongList({
          id: newSongId,
          vote: 1
        });
        // this.songList.unshift();
        // this.songList.push({
        //   id: newSongId,
        //   vote: 1
        // });
        console.log(this.songList);
        console.log('added ', vote);
      }
    });
  }

  public addToSongList(newSong) {
    this.songList.unshift(newSong);
  }

  private async populateSongList() {
    const newSongObj = await this.spotifyService.getPlaylist(this.playlistId) as any;
    console.log(newSongObj);
    this.songList = newSongObj.songs;
  }

  public updateThreshold(newThreshold) {
    console.log(newThreshold);
  }

}
