import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSliderOne } from './home-slider-one';

describe('HomeSliderOne', () => {
  let component: HomeSliderOne;
  let fixture: ComponentFixture<HomeSliderOne>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSliderOne]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSliderOne);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
