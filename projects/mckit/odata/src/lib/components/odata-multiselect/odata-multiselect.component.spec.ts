import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdataMultiselectComponent } from './odata-multiselect.component';

describe('OdataMultiselectComponent', () => {
  let component: OdataMultiselectComponent;
  let fixture: ComponentFixture<OdataMultiselectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OdataMultiselectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OdataMultiselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
