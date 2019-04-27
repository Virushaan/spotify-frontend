import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/spotify-service.service';

@Component({
  selector: 'app-song-card',
  templateUrl: './song-card.component.html',
  styleUrls: ['./song-card.component.scss']
})
export class SongCardComponent implements OnInit, OnChanges {

  @Input() public songId: string;
  public sanitizedSongId: SafeResourceUrl = this.sanitizer.bypassSecurityTrustUrl('');
  public clicked = false;

  constructor(
    private readonly sanitizer: DomSanitizer,
    private readonly spotifyService: SpotifyService,
    private readonly router: Router
  ) { }

  ngOnInit() {
  }

  private whenVotedFor() {
    this.clicked = true;
    setTimeout(() => {
      this.clicked = false;
    }, 1500);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.songId) {
      this.sanitizedSongId = this.sanitizer.bypassSecurityTrustResourceUrl('https://open.spotify.com/embed/track/' + this.songId);
    }
  }

  public vote() {
    const playlistId = this.router.url.substr(1);
    this.whenVotedFor();
    this.spotifyService.vote(playlistId, this.songId);
  }

}
