import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCMessageVideoComponent } from './video.component';

describe('MCMessageVideoComponent', () => {
  let component: MCMessageVideoComponent;
  let fixture: ComponentFixture<MCMessageVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCMessageVideoComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MCMessageVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
