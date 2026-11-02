import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { AvatarWithMenuComponent, MCAvatarWithMenu } from './avatar-with-menu.component';
import { MCAuthenticationService } from '../../services/authentication.service';
import { MCUser } from '../../entities/mc-user';

describe('AvatarWithMenuComponent', () => {
  let component: AvatarWithMenuComponent;
  let fixture: ComponentFixture<AvatarWithMenuComponent>;
  let authServiceSpy: jasmine.SpyObj<MCAuthenticationService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('MCAuthenticationService', ['getUser']);
    const mockUser = new MCUser();
    mockUser.firstname = 'Jane';
    mockUser.lastname = 'Doe';
    authServiceSpy.getUser.and.returnValue(of(mockUser));

    await TestBed.configureTestingModule({
      imports: [AvatarWithMenuComponent],
      providers: [
        provideNoopAnimations(),
        { provide: MCAuthenticationService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarWithMenuComponent);
    component = fixture.componentInstance;
    component.component = new MCAvatarWithMenu([{ label: 'Placeholder' }, { label: 'Logout' }]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user and update first menu item label', () => {
    expect(authServiceSpy.getUser).toHaveBeenCalled();
    expect(component.user()?.firstname).toBe('Jane');
    expect(component.items().length).toBe(2);
    expect(component.items()[0].label).toBe('Hi Jane');
  });

  it('should not set items if config items is empty', () => {
    component.items.set([]);
    component.component = new MCAvatarWithMenu([]);
    component.loadMenu();
    expect(component.items().length).toBe(0);
  });

  it('should render avatar with photo when user has photo', () => {
    const userWithPhoto = new MCUser();
    userWithPhoto.firstname = 'Alice';
    userWithPhoto.lastname = 'Smith';
    userWithPhoto.photo = 'https://example.com/photo.jpg';
    component.user.set(userWithPhoto);
    fixture.detectChanges();

    const avatarEl = fixture.nativeElement.querySelector('p-avatar');
    expect(avatarEl).toBeTruthy();
  });

  it('should not render avatar when user is undefined', () => {
    component.user.set(undefined);
    fixture.detectChanges();

    const avatarEl = fixture.nativeElement.querySelector('p-avatar');
    expect(avatarEl).toBeNull();
  });
});
