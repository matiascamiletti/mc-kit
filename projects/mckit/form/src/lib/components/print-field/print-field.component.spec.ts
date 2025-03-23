import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintFieldComponent } from './print-field.component';

describe('PrintFieldComponent', () => {
  let component: PrintFieldComponent;
  let fixture: ComponentFixture<PrintFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
