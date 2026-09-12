import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MCPermissionService } from './mc-permission.service';
import { MCAuthenticationService } from './authentication.service';
import { MC_PERMISSION_CONFIG } from '../entities/mc-role-permission.models';
import { MCUser } from '../entities/mc-user';
import { MCPermission } from '../entities/mc-permission.entity';

describe('MCPermissionService', () => {
  let service: MCPermissionService;
  let authServiceSpy: jasmine.SpyObj<MCAuthenticationService>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('MCAuthenticationService', ['getUser']);
    authServiceSpy.getUser.and.returnValue(of(undefined));

    TestBed.configureTestingModule({
      providers: [
        MCPermissionService,
        { provide: MCAuthenticationService, useValue: authServiceSpy },
        {
          provide: MC_PERMISSION_CONFIG,
          useValue: {
            superAdminRole: 'superadmin',
            wildcardEnabled: true,
          },
        },
      ],
    });

    service = TestBed.inject(MCPermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Role management', () => {
    it('should set and check single role', () => {
      service.setRoles(['admin', 'editor']);
      expect(service.hasRole('admin')).toBeTrue();
      expect(service.hasRole('editor')).toBeTrue();
      expect(service.hasRole('viewer')).toBeFalse();
    });

    it('should support ANY and ALL modes for roles', () => {
      service.setRoles(['admin', 'editor']);
      expect(service.hasRole(['admin', 'viewer'], 'ANY')).toBeTrue();
      expect(service.hasRole(['admin', 'viewer'], 'ALL')).toBeFalse();
      expect(service.hasRole(['admin', 'editor'], 'ALL')).toBeTrue();
    });

    it('should add and remove roles', () => {
      service.setRoles(['admin']);
      service.addRole('manager');
      expect(service.hasRole('manager')).toBeTrue();

      service.removeRole('admin');
      expect(service.hasRole('admin')).toBeFalse();
      expect(service.hasRole('manager')).toBeTrue();
    });
  });

  describe('Permission management', () => {
    it('should check exact permissions', () => {
      service.setPermissions(['users:read', 'users:create']);
      expect(service.hasPermission('users:read')).toBeTrue();
      expect(service.hasPermission('users:create')).toBeTrue();
      expect(service.hasPermission('users:delete')).toBeFalse();
    });

    it('should support wildcards', () => {
      service.setPermissions(['users:*', 'articles:read']);
      expect(service.hasPermission('users:read')).toBeTrue();
      expect(service.hasPermission('users:delete')).toBeTrue();
      expect(service.hasPermission('articles:read')).toBeTrue();
      expect(service.hasPermission('articles:delete')).toBeFalse();
    });

    it('should support global wildcard (*)', () => {
      service.setPermissions(['*']);
      expect(service.hasPermission('anything:read')).toBeTrue();
      expect(service.hasPermission('system:manage')).toBeTrue();
    });

    it('should bypass checks for superadmin role', () => {
      service.setRoles(['superadmin']);
      service.setPermissions([]);
      expect(service.hasPermission('any:permission')).toBeTrue();
    });

    it('should support can helper method', () => {
      service.setPermissions(['posts:write']);
      expect(service.can('write', 'posts')).toBeTrue();
      expect(service.can('delete', 'posts')).toBeFalse();
    });

    it('should support ANY and ALL modes for permissions', () => {
      service.setPermissions(['users:read', 'users:write']);
      expect(service.hasPermission(['users:read', 'users:delete'], 'ANY')).toBeTrue();
      expect(service.hasPermission(['users:read', 'users:delete'], 'ALL')).toBeFalse();
      expect(service.hasPermission(['users:read', 'users:write'], 'ALL')).toBeTrue();
    });
  });

  describe('User Loading', () => {
    it('should load roles and permissions from MCUser', () => {
      const user = new MCUser();
      user.roles = ['admin'];
      user.permissions = ['billing:view'];

      service.loadUser(user);

      expect(service.hasRole('admin')).toBeTrue();
      expect(service.hasPermission('billing:view')).toBeTrue();
    });

    it('should clear roles and permissions when user is undefined', () => {
      service.setRoles(['admin']);
      service.setPermissions(['users:read']);
      service.loadUser(undefined);

      expect(service.roles().length).toBe(0);
      expect(service.permissions().length).toBe(0);
    });
  });
});
