import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldsetFieldComponent } from './fieldset-field.component';

describe('FieldsetFieldComponent', () => {
  let component: FieldsetFieldComponent;
  let fixture: ComponentFixture<FieldsetFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldsetFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldsetFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
