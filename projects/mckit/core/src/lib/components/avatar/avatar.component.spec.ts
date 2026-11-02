import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvatarComponent, MCAvatar } from './avatar.component';

describe('AvatarComponent', () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
    component.component = new MCAvatar({ label: 'MC' });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render p-avatar when image is undefined', () => {
    const avatarEl = fixture.nativeElement.querySelector('p-avatar');
    expect(avatarEl).toBeTruthy();
  });

  it('should not render p-avatar when image is defined', () => {
    component.component = new MCAvatar({ image: 'https://example.com/avatar.png' });
    fixture.detectChanges();
    const avatarEl = fixture.nativeElement.querySelector('p-avatar');
    expect(avatarEl).toBeNull();
  });

  it('should set default config values in MCAvatar', () => {
    const mcAvatar = new MCAvatar({ label: 'AB' });
    expect(mcAvatar.component).toBe(AvatarComponent);
    expect(mcAvatar.config).toEqual({
      label: 'AB',
      image: undefined,
      size: 'large',
      shape: 'square',
      class: '',
    });
  });

  it('should set custom config values in MCAvatar', () => {
    const mcAvatar = new MCAvatar({
      label: 'XY',
      image: 'img.png',
      size: 'xlarge',
      shape: 'circle',
      class: 'custom-class',
    });
    expect(mcAvatar.config).toEqual({
      label: 'XY',
      image: 'img.png',
      size: 'xlarge',
      shape: 'circle',
      class: 'custom-class',
    });
  });
});
