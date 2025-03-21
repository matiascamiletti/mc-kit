import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdataPageComponent } from './odata-page.component';

describe('OdataPageComponent', () => {
  let component: OdataPageComponent;
  let fixture: ComponentFixture<OdataPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OdataPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OdataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
