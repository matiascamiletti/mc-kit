import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowFieldComponent } from './row-field.component';

describe('RowFieldComponent', () => {
  let component: RowFieldComponent;
  let fixture: ComponentFixture<RowFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RowFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RowFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
