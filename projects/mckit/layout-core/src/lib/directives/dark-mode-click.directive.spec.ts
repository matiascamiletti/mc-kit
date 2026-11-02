import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MCDarkModeClickDirective } from './dark-mode-click.directive';

@Component({
  standalone: true,
  imports: [MCDarkModeClickDirective],
  template: `
    <button id="default-btn" mcDarkModeClick>Toggle Default</button>
    <button id="custom-btn" mcDarkModeClick [darkClassName]="'custom-dark'">Toggle Custom</button>
  `
})
class TestDarkModeHostComponent {}

describe('MCDarkModeClickDirective', () => {
  let fixture: ComponentFixture<TestDarkModeHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestDarkModeHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestDarkModeHostComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    const htmlEl = document.querySelector('html');
    htmlEl?.classList.remove('my-app-dark', 'custom-dark');
  });

  it('should toggle default dark class on html element when clicked', () => {
    const htmlEl = document.querySelector('html')!;
    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('#default-btn');

    expect(htmlEl.classList.contains('my-app-dark')).toBeFalse();
    btn.click();
    expect(htmlEl.classList.contains('my-app-dark')).toBeTrue();
    btn.click();
    expect(htmlEl.classList.contains('my-app-dark')).toBeFalse();
  });

  it('should toggle custom darkClassName on html element when clicked', () => {
    const htmlEl = document.querySelector('html')!;
    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('#custom-btn');

    expect(htmlEl.classList.contains('custom-dark')).toBeFalse();
    btn.click();
    expect(htmlEl.classList.contains('custom-dark')).toBeTrue();
  });
});
