import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { admimGuardGuard } from './admim-guard.guard';

describe('admimGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => admimGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
