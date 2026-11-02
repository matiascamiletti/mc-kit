import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { MCAuthSakaiComponent, MCAuthSakaiConfig } from './auth-sakai.component';
import { MCAuthSakaiSocialComponent } from '../auth-sakai-only-social/auth-sakai-only-social.component';

describe('MCAuthSakaiComponent', () => {
  let component: MCAuthSakaiComponent;
  let fixture: ComponentFixture<MCAuthSakaiComponent>;
  const mockConfig: MCAuthSakaiConfig = {
    title: 'Sign in to Sakai',
    subtitle: 'Welcome',
    logo: 'https://example.com/logo.png',
    resetPassword: 'Forgot password?'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCAuthSakaiComponent],
      providers: [provideNoopAnimations()]
    }).compileComponents();

    fixture = TestBed.createComponent(MCAuthSakaiComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('config', mockConfig);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit submit when form is valid', () => {
    const submitSpy = spyOn(component.submit, 'emit');
    component.setEmailValue('sakai@example.com');
    component.group.get('password')?.setValue('secret');

    component.onClickSubmit();
    expect(submitSpy).toHaveBeenCalledWith(
      jasmine.objectContaining({ email: 'sakai@example.com', password: 'secret' })
    );
  });

  it('should emit action when onAction is called', () => {
    const actionSpy = spyOn(component.action, 'emit');
    component.onAction('forgot-password');
    expect(actionSpy).toHaveBeenCalledWith('forgot-password');
  });
});

describe('MCAuthSakaiSocialComponent', () => {
  let component: MCAuthSakaiSocialComponent;
  let fixture: ComponentFixture<MCAuthSakaiSocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCAuthSakaiSocialComponent],
      providers: [provideNoopAnimations()]
    }).compileComponents();

    fixture = TestBed.createComponent(MCAuthSakaiSocialComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('config', {
      title: 'Social Login',
      subtitle: 'Welcome',
      logo: 'https://example.com/logo.png'
    });
    fixture.detectChanges();
  });

  it('should create and emit submit and action', () => {
    expect(component).toBeTruthy();
    const submitSpy = spyOn(component.submit, 'emit');
    const actionSpy = spyOn(component.action, 'emit');

    component.onSubmit({ email: 'a@b.com', password: '123' });
    expect(submitSpy).toHaveBeenCalledWith({ email: 'a@b.com', password: '123' });

    component.onAction('google');
    expect(actionSpy).toHaveBeenCalledWith('google');
  });
});
