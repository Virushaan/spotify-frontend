import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SpotifyService } from 'src/app/spotify-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  @Output() thresholdUpdated = new EventEmitter();
  public thresholdValue = 1;
  public playlistId = this.router.url.substr(1);
  public generateAuthUrl = `https://accounts.spotify.com/authorize?client_id=d9682bef66264be29d0a69b1b9ce81f1&response_type=token&scope=playlist-modify-public&redirect_uri=http://localhost:4200/generate/callback&state=`;

  constructor(private readonly spotifyService: SpotifyService, private readonly router: Router) { }

  ngOnInit() {
  }

  public updateThreshold(newThreshold) {
    console.log('updated threshold')
    this.thresholdUpdated.emit(this.thresholdValue);
  }

  public async gotoAuth() {
    (document as any).location.href = `${this.generateAuthUrl}${this.playlistId},${this.thresholdValue}`;
  }

}
