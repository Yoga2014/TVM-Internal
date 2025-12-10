import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { LoginRouteGuard } from './login-route.guard';

describe('loginRouteGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => LoginRouteGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
