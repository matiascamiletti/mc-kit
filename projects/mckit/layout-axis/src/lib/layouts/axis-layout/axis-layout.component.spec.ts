import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AxisLayout } from './axis-layout.component';

describe('AxisLayout', () => {
  let component: AxisLayout;
  let fixture: ComponentFixture<AxisLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AxisLayout]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AxisLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
