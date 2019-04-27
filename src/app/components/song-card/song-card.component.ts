import { Component, Input, OnChanges, OnInit, SimpleChanges, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/spotify-service.service';
import { SongItem } from 'src/app/playlist/playlist.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-song-card',
  templateUrl: './song-card.component.html',
  styleUrls: ['./song-card.component.scss']
})
export class SongCardComponent implements OnInit, OnChanges {

  @Input() public song: SongItem;
  @Output() public addedVote = new EventEmitter();

  public sanitizedSongId: SafeResourceUrl = this.sanitizer.bypassSecurityTrustUrl('');
  public clicked = false;

  constructor(
    private readonly sanitizer: DomSanitizer,
    private readonly spotifyService: SpotifyService,
    private readonly router: Router,
    private readonly changeDetectionRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.spotifyService.onVote
    .pipe(
      filter(songId => songId === this.song.id)
    ).subscribe(vote => {
      this.addedVote.emit(vote as string);
      this.whenVotedFor();
      console.log('got vote from socket', vote);
    });
  }

  private whenVotedFor() {
    this.clicked = false;
    this.clicked = true;
    this.changeDetectionRef.detectChanges();
    setTimeout(() => {
      this.clicked = false;
    }, 1500);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.song) {
      this.sanitizedSongId = this.sanitizer.bypassSecurityTrustResourceUrl('https://open.spotify.com/embed/track/' + this.song.id);
      console.log(changes.song);
    }
  }

  public vote() {
    const playlistId = this.router.url.substr(1);
    this.whenVotedFor();
    this.spotifyService.vote(playlistId, this.song.id);
  }

}
