import { TestBed } from '@angular/core/testing';

import { CinemameService } from './cinemame.service';

describe('CinemameService', () => {
  let service: CinemameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CinemameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
