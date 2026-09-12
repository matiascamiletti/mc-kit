import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MCHasRoleDirective } from './mc-has-role.directive';
import { MCPermissionService } from '../services/mc-permission.service';
import { MCAuthenticationService } from '../services/authentication.service';

@Component({
  standalone: true,
  imports: [MCHasRoleDirective],
  template: `
    <div *mcHasRole="'admin'" id="admin-box">Admin content</div>
    <div *mcHasRole="['manager', 'editor']; else fallback" id="multi-box">Multi role content</div>
    <ng-template #fallback><div id="fallback-box">Fallback content</div></ng-template>
  `,
})
class TestHostComponent {}

describe('MCHasRoleDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let permissionService: MCPermissionService;
  let authServiceSpy: jasmine.SpyObj<MCAuthenticationService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('MCAuthenticationService', ['getUser']);
    authServiceSpy.getUser.and.returnValue(of(undefined));

    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [
        MCPermissionService,
        { provide: MCAuthenticationService, useValue: authServiceSpy },
      ],
    }).compileComponents();

    permissionService = TestBed.inject(MCPermissionService);
    fixture = TestBed.createComponent(TestHostComponent);
  });

  it('should not render admin-box if user does not have admin role', () => {
    permissionService.setRoles(['viewer']);
    fixture.detectChanges();

    const adminEl = fixture.nativeElement.querySelector('#admin-box');
    expect(adminEl).toBeNull();
  });

  it('should render admin-box if user has admin role', () => {
    permissionService.setRoles(['admin']);
    fixture.detectChanges();

    const adminEl = fixture.nativeElement.querySelector('#admin-box');
    expect(adminEl).not.toBeNull();
    expect(adminEl.textContent).toContain('Admin content');
  });

  it('should render fallback if role match fails', () => {
    permissionService.setRoles(['viewer']);
    fixture.detectChanges();

    const fallbackEl = fixture.nativeElement.querySelector('#fallback-box');
    expect(fallbackEl).not.toBeNull();
  });
});
