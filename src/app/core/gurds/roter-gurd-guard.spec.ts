import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { roterGurdGuard } from './roter-gurd-guard';

describe('roterGurdGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => roterGurdGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
