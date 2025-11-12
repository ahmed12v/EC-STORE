import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Scrollbnt } from './scrollbnt';

describe('Scrollbnt', () => {
  let component: Scrollbnt;
  let fixture: ComponentFixture<Scrollbnt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Scrollbnt]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Scrollbnt);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
