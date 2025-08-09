import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnFieldComponent } from './column-field.component';

describe('ColumnFieldComponent', () => {
  let component: ColumnFieldComponent;
  let fixture: ComponentFixture<ColumnFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColumnFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
