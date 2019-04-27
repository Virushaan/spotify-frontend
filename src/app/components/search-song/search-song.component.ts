import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import {map, startWith, debounceTime, filter, tap} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { SpotifyService } from 'src/app/spotify-service.service';
import { Router } from '@angular/router';

export interface SongSuggestion {
  name: string;
  artists: Artists[];
  id: string;
}

export interface Artists {
  name: string;
}

@Component({
  selector: 'app-search-song',
  templateUrl: './search-song.component.html',
  styleUrls: ['./search-song.component.scss']
})

export class SearchSongComponent implements OnInit {

  @Output() public addedSong = new EventEmitter();

  public searchControl = new FormControl();

  filteredStates: Observable<SongSuggestion[]>;

  // TODO prefill
  public songNames: SongSuggestion[] = [];

  constructor(
    private readonly spotifyService: SpotifyService,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.searchControl.valueChanges
    .pipe(
      tap(arg => {
        if (arg === '') {
          this.filteredStates = of([]);
        }
        return arg;
      }),
      filter(arg => arg !== ''),
      debounceTime(200)
    ).subscribe(query => {
      this.search(query);
    });
  }

  public addSong(song: SongSuggestion) {
    const playlistId = this.router.url.substr(1);
    this.addedSong.emit(song.id);
    this.spotifyService.vote(playlistId, song.id);
  }

  public async search(query) {
    const songs = await this.spotifyService.search(query);
    console.log('SONGS', songs);
    this.songNames = songs.songs.map(arg => ({
      name: arg.name,
      artists: arg.artists,
      id: arg.id,
      album: arg.album
    }));
    console.log(this.songNames);
    this.filteredStates = of(this.songNames);
  }

}
