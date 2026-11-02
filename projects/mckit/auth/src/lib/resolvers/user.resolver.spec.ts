import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { mcUserResolver } from './user.resolver';
import { MCAuthenticationService } from '../services/authentication.service';
import { MCUser } from '../entities/mc-user';

describe('mcUserResolver', () => {
  let authServiceSpy: jasmine.SpyObj<MCAuthenticationService>;

  const executeResolver: ResolveFn<MCUser | undefined> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => mcUserResolver(...resolverParameters));

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('MCAuthenticationService', ['getUser']);

    TestBed.configureTestingModule({
      providers: [
        { provide: MCAuthenticationService, useValue: authServiceSpy }
      ]
    });
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });

  it('should resolve user from MCAuthenticationService', (done) => {
    const mockUser = new MCUser();
    mockUser.email = 'test@example.com';
    authServiceSpy.getUser.and.returnValue(of(mockUser));

    const result$ = executeResolver({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot) as Observable<MCUser | undefined>;
    result$.subscribe((user) => {
      expect(authServiceSpy.getUser).toHaveBeenCalled();
      expect(user).toBe(mockUser);
      done();
    });
  });
});
