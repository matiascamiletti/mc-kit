import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MCPageTitleComponent } from './page-title.component';

describe('MCPageTitleComponent', () => {
  let component: MCPageTitleComponent;
  let fixture: ComponentFixture<MCPageTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCPageTitleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MCPageTitleComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render pretitle, title, and subtitle when provided', async () => {
    fixture.componentRef.setInput('pretitle', 'PANEL');
    fixture.componentRef.setInput('title', 'Usuarios');
    fixture.componentRef.setInput('subtitle', 'Listado completo de usuarios');
    await fixture.whenStable();

    const text = fixture.nativeElement.textContent;
    expect(text).toContain('PANEL');
    expect(text).toContain('Usuarios');
    expect(text).toContain('Listado completo de usuarios');
    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain('Usuarios');
  });

  it('should apply customClass to the root element', async () => {
    fixture.componentRef.setInput('customClass', 'my-custom-title-class');
    await fixture.whenStable();

    const root: HTMLElement = fixture.nativeElement.firstElementChild;
    expect(root.classList.contains('my-custom-title-class')).toBe(true);
  });
});
