import { TestBed } from '@angular/core/testing';

import { SpotifyServiceService } from './spotify-service.service';

describe('SpotifyServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpotifyServiceService = TestBed.get(SpotifyServiceService);
    expect(service).toBeTruthy();
  });
});
