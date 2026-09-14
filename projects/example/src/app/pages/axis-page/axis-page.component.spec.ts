import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AxisPageComponent } from './axis-page.component';

describe('AxisPageComponent', () => {
  let component: AxisPageComponent;
  let fixture: ComponentFixture<AxisPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AxisPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AxisPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
