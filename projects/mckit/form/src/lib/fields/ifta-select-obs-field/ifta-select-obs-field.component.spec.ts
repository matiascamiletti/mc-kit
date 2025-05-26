import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IftaSelectObsFieldComponent } from './ifta-select-obs-field.component';

describe('IftaSelectObsFieldComponent', () => {
  let component: IftaSelectObsFieldComponent;
  let fixture: ComponentFixture<IftaSelectObsFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IftaSelectObsFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IftaSelectObsFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
