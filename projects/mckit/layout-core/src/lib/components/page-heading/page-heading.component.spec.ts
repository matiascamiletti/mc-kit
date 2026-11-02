import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MCPageHeadingComponent } from './page-heading.component';

describe('MCPageHeadingComponent', () => {
  let component: MCPageHeadingComponent;
  let fixture: ComponentFixture<MCPageHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCPageHeadingComponent],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MCPageHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should compute hasBreadcrumb as false when breadcrumb is undefined or empty', () => {
    expect(component.hasBreadcrumb()).toBeFalse();
    expect(fixture.nativeElement.querySelector('p-breadcrumb')).toBeNull();

    fixture.componentRef.setInput('breadcrumb', []);
    fixture.detectChanges();
    expect(component.hasBreadcrumb()).toBeFalse();
    expect(fixture.nativeElement.querySelector('p-breadcrumb')).toBeNull();
  });

  it('should compute hasBreadcrumb as true and render p-breadcrumb when items are provided', () => {
    fixture.componentRef.setInput('breadcrumb', [{ label: 'Home' }, { label: 'Settings' }]);
    fixture.detectChanges();

    expect(component.hasBreadcrumb()).toBeTrue();
    expect(fixture.nativeElement.querySelector('p-breadcrumb')).toBeTruthy();
  });

  it('should render title and optional subtitle', () => {
    fixture.componentRef.setInput('title', 'Main Heading');
    fixture.detectChanges();

    const h1: HTMLElement = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toBe('Main Heading');
    expect(fixture.nativeElement.querySelector('.mc-page-heading-subtitle')).toBeNull();

    fixture.componentRef.setInput('subtitle', 'Sub Heading');
    fixture.detectChanges();

    const sub: HTMLElement = fixture.nativeElement.querySelector('.mc-page-heading-subtitle');
    expect(sub).toBeTruthy();
    expect(sub.textContent).toBe('Sub Heading');
  });
});
