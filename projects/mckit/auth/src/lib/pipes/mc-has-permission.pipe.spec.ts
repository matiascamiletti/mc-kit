import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MCHasPermissionPipe } from './mc-has-permission.pipe';
import { MCPermissionService } from '../services/mc-permission.service';
import { MCAuthenticationService } from '../services/authentication.service';

describe('MCHasPermissionPipe', () => {
  let pipe: MCHasPermissionPipe;
  let permissionService: MCPermissionService;
  let authServiceSpy: jasmine.SpyObj<MCAuthenticationService>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('MCAuthenticationService', ['getUser']);
    authServiceSpy.getUser.and.returnValue(of(undefined));

    TestBed.configureTestingModule({
      providers: [
        MCHasPermissionPipe,
        MCPermissionService,
        { provide: MCAuthenticationService, useValue: authServiceSpy },
      ],
    });

    pipe = TestBed.inject(MCHasPermissionPipe);
    permissionService = TestBed.inject(MCPermissionService);
  });

  it('should return true if user has permission', () => {
    permissionService.setPermissions(['users:read']);
    expect(pipe.transform('users:read')).toBeTrue();
    expect(pipe.transform('users:delete')).toBeFalse();
  });

  it('should support multiple permissions', () => {
    permissionService.setPermissions(['users:read']);
    expect(pipe.transform(['users:read', 'users:delete'], 'ANY')).toBeTrue();
    expect(pipe.transform(['users:read', 'users:delete'], 'ALL')).toBeFalse();
  });
});
