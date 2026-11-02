import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MCPermissionService } from './mc-permission.service';
import { MCAuthenticationService } from './authentication.service';
import { MC_PERMISSION_CONFIG } from '../entities/mc-role-permission.models';
import { MCUser } from '../entities/mc-user';
import { MCPermission } from '../entities/mc-permission.entity';
import { MCRole } from '../entities/mc-role.entity';
import { provideMCAuth, provideMCPermissions } from '../providers/auth.provider';
import { MC_AUTH_CONFIG } from '../entities/mc-auth-config';

describe('MCPermissionService & Entities', () => {
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
      expect(service.hasRole([])).toBeTrue();
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
      expect(service.hasPermission([])).toBeTrue();
      expect(service.permissionNames()).toEqual(['users:read', 'users:create']);
    });

    it('should add and remove permissions', () => {
      service.setPermissions(['users:read']);
      service.addPermission('users:write', 'users:read');
      expect(service.permissions().length).toBe(2);

      service.removePermission('users:read');
      expect(service.hasPermission('users:read')).toBeFalse();
      expect(service.hasPermission('users:write')).toBeTrue();
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

    it('should evaluate canPass for guard data', () => {
      service.setRoles(['editor']);
      service.setPermissions(['posts:write']);

      expect(service.canPass()).toBeTrue();
      expect(service.canPass({ roles: ['editor'], permissions: ['posts:write'] })).toBeTrue();
      expect(service.canPass({ roles: ['admin'], permissions: ['posts:write'] })).toBeFalse();
      expect(service.canPass({ roles: ['editor'], permissions: ['posts:delete'] })).toBeFalse();
    });

    it('should check roles and permissions via observables', (done) => {
      const user = new MCUser();
      user.roles = ['manager'];
      user.permissions = ['orders:approve'];
      authServiceSpy.getUser.and.returnValue(of(user));

      service.hasRole$('manager').subscribe((hasRole) => {
        expect(hasRole).toBeTrue();
        service.hasPermission$('orders:approve').subscribe((hasPerm) => {
          expect(hasPerm).toBeTrue();
          done();
        });
      });
    });
  });

  describe('User Loading', () => {
    it('should load roles and permissions from MCUser including role, extra, and role.permissions', () => {
      const user = new MCUser();
      user.role = 'staff';
      user.roles = [MCRole.from({ name: 'admin', permissions: ['system:logs'] })];
      user.permissions = ['billing:view'];
      user.extra = {
        roles: ['auditor'],
        permissions: ['audit:read']
      };

      service.loadUser(user);

      expect(service.hasRole('admin')).toBeTrue();
      expect(service.hasRole('staff')).toBeTrue();
      expect(service.hasRole('auditor')).toBeTrue();
      expect(service.hasPermission('billing:view')).toBeTrue();
      expect(service.hasPermission('system:logs')).toBeTrue();
      expect(service.hasPermission('audit:read')).toBeTrue();
    });

    it('should clear roles and permissions when user is undefined', () => {
      service.setRoles(['admin']);
      service.setPermissions(['users:read']);
      service.loadUser(undefined);

      expect(service.roles().length).toBe(0);
      expect(service.permissions().length).toBe(0);
    });
  });

  describe('MCPermission & MCRole static helpers & providers', () => {
    it('should parse MCPermission from string and partial object', () => {
      const p1 = MCPermission.from('orders');
      expect(p1.subject).toBe('orders');
      expect(p1.action).toBe('*');
      expect(MCPermission.toName({ subject: 'orders' })).toBe('orders:*');

      const p2 = MCPermission.from({ name: 'users:edit' });
      expect(p2.subject).toBe('users');
      expect(p2.action).toBe('edit');

      const p3 = MCPermission.from({ name: 'global' });
      expect(p3.subject).toBe('global');
      expect(p3.action).toBe('*');

      expect(MCPermission.matches('users:read', 'users:read', false)).toBeTrue();
      expect(MCPermission.matches('users:*', 'users:read', false)).toBeFalse();
      expect(MCPermission.matches('', 'users:read')).toBeFalse();
    });

    it('should parse MCRole from number and partial object', () => {
      const r1 = MCRole.from(1);
      expect(r1.name).toBe('1');
      expect(MCRole.toName({ id: 5 })).toBe('5');
      expect(MCRole.toName({})).toBe('');
      expect(MCRole.matches('Admin', 'admin')).toBeTrue();
    });

    it('should provide auth and permission configs via provider functions', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          { provide: MCAuthenticationService, useValue: authServiceSpy },
          provideMCAuth({ baseUrl: 'https://test.api/' }),
          provideMCPermissions({ superAdminRole: 'root' })
        ]
      });

      const authConfig = TestBed.inject(MC_AUTH_CONFIG);
      const permService = TestBed.inject(MCPermissionService);
      expect(authConfig.baseUrl).toBe('https://test.api/');
      permService.setRoles(['root']);
      expect(permService.isSuperAdmin()).toBeTrue();
    });
  });
});
