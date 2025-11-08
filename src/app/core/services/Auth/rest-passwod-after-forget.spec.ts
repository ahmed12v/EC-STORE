import { TestBed } from '@angular/core/testing';

import { RestPasswodAfterForget } from './rest-passwod-after-forget';

describe('RestPasswodAfterForget', () => {
  let service: RestPasswodAfterForget;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestPasswodAfterForget);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
