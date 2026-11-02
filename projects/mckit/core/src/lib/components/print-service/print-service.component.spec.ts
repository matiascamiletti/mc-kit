import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrintServiceComponent } from './print-service.component';
import { McComponentService } from '../../services/mc-component.service';
import { MCSubtitle } from '../subtitle/subtitle.component';

describe('PrintServiceComponent', () => {
  let component: PrintServiceComponent;
  let fixture: ComponentFixture<PrintServiceComponent>;
  let componentService: McComponentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintServiceComponent]
    })
    .compileComponents();

    componentService = TestBed.inject(McComponentService);
    componentService.setComponents('header-slot', [new MCSubtitle('Header Item')]);

    fixture = TestBed.createComponent(PrintServiceComponent);
    component = fixture.componentInstance;
    component.id = 'header-slot';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load components from McComponentService on init', () => {
    expect(component.components.length).toBe(1);
    const h2 = fixture.nativeElement.querySelector('h2');
    expect(h2).toBeTruthy();
    expect(h2.textContent).toBe('Header Item');
  });
});
