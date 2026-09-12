import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MCHasRolePipe } from './mc-has-role.pipe';
import { MCPermissionService } from '../services/mc-permission.service';
import { MCAuthenticationService } from '../services/authentication.service';

describe('MCHasRolePipe', () => {
  let pipe: MCHasRolePipe;
  let permissionService: MCPermissionService;
  let authServiceSpy: jasmine.SpyObj<MCAuthenticationService>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('MCAuthenticationService', ['getUser']);
    authServiceSpy.getUser.and.returnValue(of(undefined));

    TestBed.configureTestingModule({
      providers: [
        MCHasRolePipe,
        MCPermissionService,
        { provide: MCAuthenticationService, useValue: authServiceSpy },
      ],
    });

    pipe = TestBed.inject(MCHasRolePipe);
    permissionService = TestBed.inject(MCPermissionService);
  });

  it('should return true if user has role', () => {
    permissionService.setRoles(['admin', 'editor']);
    expect(pipe.transform('admin')).toBeTrue();
    expect(pipe.transform('guest')).toBeFalse();
  });

  it('should support multiple roles', () => {
    permissionService.setRoles(['editor']);
    expect(pipe.transform(['admin', 'editor'], 'ANY')).toBeTrue();
    expect(pipe.transform(['admin', 'editor'], 'ALL')).toBeFalse();
  });
});
