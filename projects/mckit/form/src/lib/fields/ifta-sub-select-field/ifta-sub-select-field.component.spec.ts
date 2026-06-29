import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IftaSubSelectFieldComponent } from './ifta-sub-select-field.component';

describe('IftaSubSelectFieldComponent', () => {
  let component: IftaSubSelectFieldComponent;
  let fixture: ComponentFixture<IftaSubSelectFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IftaSubSelectFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IftaSubSelectFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
