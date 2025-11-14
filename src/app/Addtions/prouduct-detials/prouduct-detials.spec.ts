import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProuductDetials } from './prouduct-detials';

describe('ProuductDetials', () => {
  let component: ProuductDetials;
  let fixture: ComponentFixture<ProuductDetials>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProuductDetials]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProuductDetials);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
