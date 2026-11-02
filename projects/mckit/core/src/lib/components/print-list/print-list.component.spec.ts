import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrintListComponent } from './print-list.component';
import { MCSubtitle } from '../subtitle/subtitle.component';

describe('PrintListComponent', () => {
  let component: PrintListComponent;
  let fixture: ComponentFixture<PrintListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintListComponent);
    component = fixture.componentInstance;
    component.components = [
      new MCSubtitle('First'),
      new MCSubtitle('Second')
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render each component in the list', () => {
    const items = fixture.nativeElement.querySelectorAll('.mc-print-component');
    expect(items.length).toBe(2);
    const headings = fixture.nativeElement.querySelectorAll('h2');
    expect(headings.length).toBe(2);
    expect(headings[0].textContent).toBe('First');
    expect(headings[1].textContent).toBe('Second');
  });

  it('should apply mc-print-list-row class when isFlexRow is true', () => {
    component.isFlexRow = true;
    fixture.detectChanges();
    const container: HTMLElement = fixture.nativeElement.querySelector('.mc-print-list');
    expect(container.classList.contains('mc-print-list-row')).toBeTrue();
  });

  it('should accept classes input', () => {
    fixture.componentRef.setInput('classes', 'extra-class');
    fixture.detectChanges();
    expect(component.classes()).toBe('extra-class');
  });
});
