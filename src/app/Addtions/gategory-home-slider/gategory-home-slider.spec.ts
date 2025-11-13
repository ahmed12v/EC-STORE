import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GategoryHomeSlider } from './gategory-home-slider';

describe('GategoryHomeSlider', () => {
  let component: GategoryHomeSlider;
  let fixture: ComponentFixture<GategoryHomeSlider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GategoryHomeSlider]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GategoryHomeSlider);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
