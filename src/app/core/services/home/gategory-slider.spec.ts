import { TestBed } from '@angular/core/testing';

import { GategorySlider } from './gategory-slider';

describe('GategorySlider', () => {
  let service: GategorySlider;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GategorySlider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
