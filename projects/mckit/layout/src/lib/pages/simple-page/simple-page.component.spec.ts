import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MCSimplePage } from './simple-page.component';

describe('MCSimplePage', () => {
  let component: MCSimplePage;
  let fixture: ComponentFixture<MCSimplePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCSimplePage],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MCSimplePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should conditionally render breadcrumb, title, and subtitle', () => {
    expect(fixture.nativeElement.querySelector('p-breadcrumb')).toBeNull();
    expect(fixture.nativeElement.querySelector('h1')).toBeNull();
    expect(fixture.nativeElement.querySelector('.subtitle-mc-simple-page')).toBeNull();

    component.breadcrumb = [{ label: 'Home' }];
    component.title = 'Simple Page Title';
    component.subtitle = 'Simple Page Subtitle';
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('p-breadcrumb')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('h1')?.textContent).toBe('Simple Page Title');
    expect(fixture.nativeElement.querySelector('.subtitle-mc-simple-page')?.textContent).toBe('Simple Page Subtitle');
  });
});
