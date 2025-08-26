import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IftaCurrencyFieldComponent } from './ifta-currency-field.component';

describe('IftaCurrencyFieldComponent', () => {
  let component: IftaCurrencyFieldComponent;
  let fixture: ComponentFixture<IftaCurrencyFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IftaCurrencyFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IftaCurrencyFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
