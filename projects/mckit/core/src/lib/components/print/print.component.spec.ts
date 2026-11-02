import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrintComponent } from './print.component';
import { MCSubtitle } from '../subtitle/subtitle.component';

describe('PrintComponent', () => {
  let component: PrintComponent;
  let fixture: ComponentFixture<PrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintComponent);
    component = fixture.componentInstance;
    component.component = new MCSubtitle('Dynamic Subtitle');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dynamically instantiate the configured component', () => {
    const hostParent = fixture.nativeElement.parentElement;
    const h2 = hostParent ? hostParent.querySelector('h2') : null;
    expect(h2).toBeTruthy();
    expect(h2.textContent).toBe('Dynamic Subtitle');
  });
});
