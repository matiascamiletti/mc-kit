import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IftaMultiSelectAvatarFieldComponent } from './ifta-multi-select-avatar-field.component';

describe('IftaMultiSelectAvatarFieldComponent', () => {
  let component: IftaMultiSelectAvatarFieldComponent;
  let fixture: ComponentFixture<IftaMultiSelectAvatarFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IftaMultiSelectAvatarFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IftaMultiSelectAvatarFieldComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
