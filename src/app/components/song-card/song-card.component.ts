import { Component, Input, OnChanges, OnInit, SimpleChanges, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/spotify-service.service';
import { SongItem } from 'src/app/playlist/playlist.component';
import { filter } from 'rxjs/operators';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { NONE_TYPE } from '@angular/compiler/src/output/output_ast';

const animateTime = '65ms';
const timeoutTime = 65;

@Component({
  selector: 'app-song-card',
  templateUrl: './song-card.component.html',
  styleUrls: ['./song-card.component.scss'],
  animations: [
    trigger('changeDivSize', [
      state('initial', style({
        height: '0px',
        opacity: '0%',
      })),
      state('final', style({
        height: '80px',
        opacity: '100%'
      })),
    transition('initial=>final', animate(animateTime)),
    transition('final=>initial', animate(animateTime))
  ]),
    trigger('changeIframeSize', [
      state('initial', style({
        height: '0px',
        opacity: '0%',
      })),
      state('final', style({
        height: '80px',
        opacity: '100%'
      })),
    transition('initial=>final', animate(animateTime)),
    transition('final=>initial', animate(animateTime))
  ]),
    trigger('hideValue', [
      state('initial', style({
        display: 'none'
      })),
      state('final', style({
        display: 'block'
      })),
    transition('initial=>final', animate(animateTime)),
    transition('final=>initial', animate(animateTime))
  ]),
],
  // host: { '[@changeDivSize]': 'currentState' }
})
export class SongCardComponent implements OnInit, OnChanges {

  @Input() public song: SongItem;
  @Output() public addedVote = new EventEmitter();

  public sanitizedSongId: SafeResourceUrl = this.sanitizer.bypassSecurityTrustUrl('');
  public clicked = false;
  public currentState = 'initial';

  constructor(
    private readonly sanitizer: DomSanitizer,
    private readonly spotifyService: SpotifyService,
    private readonly router: Router,
    private readonly changeDetectionRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.currentState = 'final';
    this.spotifyService.onVote
    .pipe(
      filter(songId => songId === this.song.id)
    ).subscribe(vote => {
      this.addedVote.emit(vote as string);
      this.whenVotedFor();
      console.log('got vote from socket', vote);
    });

    this.spotifyService.hideCard.subscribe(arg => {
      console.log('hideme', arg);
      if (arg === this.song.id) {
        console.log('TOHIDE', arg);
        this.hideItem();
      }
    });
  }

  private hideItem() {
    this.currentState = 'initial';
    setTimeout(() => this.currentState = 'final', timeoutTime);
  }

  private showItem() {
    this.currentState = 'final';
    setTimeout(() => this.currentState = 'initial', timeoutTime);
  }


  private whenVotedFor() {
    this.clicked = false;
    this.clicked = true;
    this.changeDetectionRef.detectChanges();
    setTimeout(() => {
      this.clicked = false;
    }, 250);
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
