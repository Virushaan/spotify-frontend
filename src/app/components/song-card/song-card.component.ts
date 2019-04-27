import { Component, OnInit, Input, SimpleChange, OnChanges, SimpleChanges } from '@angular/core';
import { Sanitizer } from '@angular/core';
import { DomSanitizer, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-song-card',
  templateUrl: './song-card.component.html',
  styleUrls: ['./song-card.component.scss']
})
export class SongCardComponent implements OnInit, OnChanges {

  @Input() public songId: string;
  public sanitizedSongId: SafeResourceUrl = this.sanitizer.bypassSecurityTrustUrl('');

  constructor( private readonly sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.songId) {
      this.sanitizedSongId = this.sanitizer.bypassSecurityTrustResourceUrl(this.songId);
    }
  }

}
