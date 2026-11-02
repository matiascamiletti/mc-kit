import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { MCAuthBasicComponent, MCAuthBasicConfig } from './auth-basic.component';
import { MCAuthModel } from '../../entities/mc-auth-model';

describe('MCAuthBasicComponent', () => {
  let component: MCAuthBasicComponent;
  let fixture: ComponentFixture<MCAuthBasicComponent>;
  const mockConfig: MCAuthBasicConfig = {
    title: 'Welcome Back',
    subtitle: 'Sign in to continue',
    emailPlaceholder: 'Enter email',
    passwordPlaceholder: 'Enter password',
    submitButton: 'Sign In',
    resetPassword: 'Forgot password?',
    resetPasswordLink: '/forgot',
    register: 'Create account',
    registerLink: '/register'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCAuthBasicComponent],
      providers: [provideRouter([]), provideNoopAnimations()]
    }).compileComponents();

    fixture = TestBed.createComponent(MCAuthBasicComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('config', mockConfig);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not emit submit if form is invalid', () => {
    const submitSpy = spyOn(component.submit, 'emit');
    component.onClickSubmit();
    expect(submitSpy).not.toHaveBeenCalled();
    expect(component.isSending()).toBeFalse();
  });

  it('should emit submit model and set loading when form is valid', () => {
    const submitSpy = spyOn(component.submit, 'emit');
    component.setEmailValue('user@example.com');
    component.group.get('password')?.setValue('password123');

    component.onClickSubmit();

    expect(component.isSending()).toBeTrue();
    expect(submitSpy).toHaveBeenCalledWith(
      jasmine.objectContaining({
        email: 'user@example.com',
        password: 'password123'
      } as Partial<MCAuthModel>)
    );
  });

  it('should not emit submit if already sending', () => {
    const submitSpy = spyOn(component.submit, 'emit');
    component.setEmailValue('user@example.com');
    component.group.get('password')?.setValue('password123');
    component.showLoading();

    component.onClickSubmit();
    expect(submitSpy).not.toHaveBeenCalled();
  });

  it('should manage messages and loading state', () => {
    component.showSuccessMessage('Logged in!');
    expect(component.messages()).toEqual([{ severity: 'success', text: 'Logged in!' }]);

    component.showErrorMessage('Invalid credentials');
    expect(component.messages()).toEqual([{ severity: 'error', text: 'Invalid credentials' }]);

    component.clearMessages();
    expect(component.messages()).toEqual([]);

    component.showLoading();
    expect(component.isSending()).toBeTrue();
    component.hideLoading();
    expect(component.isSending()).toBeFalse();
  });
});
