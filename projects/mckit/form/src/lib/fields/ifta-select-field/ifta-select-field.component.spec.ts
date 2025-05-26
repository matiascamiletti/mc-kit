import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IftaSelectFieldComponent } from './ifta-select-field.component';

describe('IftaSelectFieldComponent', () => {
  let component: IftaSelectFieldComponent;
  let fixture: ComponentFixture<IftaSelectFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IftaSelectFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IftaSelectFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
