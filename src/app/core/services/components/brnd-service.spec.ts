import { TestBed } from '@angular/core/testing';

import { BrndService } from './brnd-service';

describe('BrndService', () => {
  let service: BrndService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrndService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
