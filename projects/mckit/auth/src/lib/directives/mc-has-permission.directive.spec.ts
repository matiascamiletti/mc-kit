import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MCHasPermissionDirective } from './mc-has-permission.directive';
import { MCPermissionService } from '../services/mc-permission.service';
import { MCAuthenticationService } from '../services/authentication.service';

@Component({
  standalone: true,
  imports: [MCHasPermissionDirective],
  template: `
    <button *mcHasPermission="'users:create'" id="create-btn">Create User</button>
    <div *mcHasPermission="['reports:view', 'reports:export']; mode: 'ALL'; else fallback" id="report-box">Report Box</div>
    <ng-template #fallback><div id="fallback-box">No permission</div></ng-template>
  `,
})
class TestHostComponent {}

describe('MCHasPermissionDirective', () => {
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

  it('should not render create-btn when lacking users:create', () => {
    permissionService.setPermissions(['users:read']);
    fixture.detectChanges();

    const btn = fixture.nativeElement.querySelector('#create-btn');
    expect(btn).toBeNull();
  });

  it('should render create-btn when having users:create', () => {
    permissionService.setPermissions(['users:create']);
    fixture.detectChanges();

    const btn = fixture.nativeElement.querySelector('#create-btn');
    expect(btn).not.toBeNull();
    expect(btn.textContent).toContain('Create User');
  });

  it('should render create-btn when wildcard users:* is present', () => {
    permissionService.setPermissions(['users:*']);
    fixture.detectChanges();

    const btn = fixture.nativeElement.querySelector('#create-btn');
    expect(btn).not.toBeNull();
  });

  it('should render fallback when lacking ALL required permissions', () => {
    permissionService.setPermissions(['reports:view']);
    fixture.detectChanges();

    const reportBox = fixture.nativeElement.querySelector('#report-box');
    const fallbackBox = fixture.nativeElement.querySelector('#fallback-box');

    expect(reportBox).toBeNull();
    expect(fallbackBox).not.toBeNull();
  });
});
