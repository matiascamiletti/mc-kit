import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdataGridPageComponent } from './odata-grid-page.component';

describe('OdataGridPageComponent', () => {
  let component: OdataGridPageComponent;
  let fixture: ComponentFixture<OdataGridPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OdataGridPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OdataGridPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
