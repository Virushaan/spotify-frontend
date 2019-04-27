import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../spotify-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(
    private readonly spotifyService: SpotifyService,
    private readonly router: Router,
  ) { }

  ngOnInit() {
  }

  public async createPlaylist() {
    const id = await this.spotifyService.createPlaylist() as {id: String};
    this.router.navigate([id.id]);
  }

}
