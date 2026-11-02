import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MCCardRoundedComponent } from './card-rounded.component';

describe('MCCardRoundedComponent', () => {
  let component: MCCardRoundedComponent;
  let fixture: ComponentFixture<MCCardRoundedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCCardRoundedComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(MCCardRoundedComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title when provided', async () => {
    fixture.componentRef.setInput('title', 'Resumen General');
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('Resumen General');
  });

  it('should render action button when actionText is provided without actionUrl and emit actionClick', async () => {
    let emitted = false;
    component.actionClick.subscribe(() => (emitted = true));

    fixture.componentRef.setInput('actionText', 'Ver más');
    await fixture.whenStable();

    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button).not.toBeNull();
    expect(button.textContent).toContain('Ver más');

    button.click();
    expect(emitted).toBe(true);
  });

  it('should render routerLink anchor when both actionText and actionUrl are provided', async () => {
    fixture.componentRef.setInput('actionText', 'Ir al detalle');
    fixture.componentRef.setInput('actionUrl', '/details');
    await fixture.whenStable();

    const anchor: HTMLAnchorElement = fixture.nativeElement.querySelector('a');
    expect(anchor).not.toBeNull();
    expect(anchor.textContent).toContain('Ir al detalle');
  });
});
