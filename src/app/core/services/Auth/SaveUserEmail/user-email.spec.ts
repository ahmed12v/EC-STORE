import { TestBed } from '@angular/core/testing';

import { UserEmail } from './user-email';

describe('UserEmail', () => {
  let service: UserEmail;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserEmail);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
