import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SpotifyService } from '../spotify-service.service';
import { Router } from '@angular/router';
import { ChangeDetectionStrategy } from '@angular/core/src/render3/jit/compiler_facade_interface';
import { ChangeDetectorStatus } from '@angular/core/src/change_detection/constants';

export interface SongItem {
  id: string;
  votes: number;
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
    private readonly router: Router,
    private readonly changeDetectionRef: ChangeDetectorRef
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
          votes: 1
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
    this.changeDetectionRef.detectChanges();
  }

  private async populateSongList() {
    const newSongObj = await this.spotifyService.getPlaylist(this.playlistId) as any;
    console.log(newSongObj);
    this.songList = newSongObj.songs.map(arg => ({
      id: arg.id,
      votes: parseInt(arg.votes, 10)
    })).sort((a, b) => b.votes - a.votes);
    console.log('onInit load', this.songList);
  }

  public updateThreshold(newThreshold) {
    console.log(newThreshold);
  }

  public incrementVote(songId: string) {
    console.log('INCREMENT SONGID', songId);
    const songIndex = this.songList.findIndex(arg => arg.id === songId);
    console.log(this.songList[songIndex]);
    console.log(this.songList, 'start');
    this.songList[songIndex].votes += 1;
    const oldSongOrder = this.songList.map((s) => s.id);
    this.songList.sort((a, b) => b.votes - a.votes);
    const changed = this.songList.filter((s, i) => (oldSongOrder[i] !== s.id));

  }

  // trackByFn(index, item) {
  //   // console.log('trackby', item);
  //   return item.id; // or item.id
  // }

}
