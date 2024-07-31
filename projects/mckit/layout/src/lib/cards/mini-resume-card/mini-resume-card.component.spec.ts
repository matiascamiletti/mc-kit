import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniResumeCardComponent } from './mini-resume-card.component';

describe('MiniResumeCardComponent', () => {
  let component: MiniResumeCardComponent;
  let fixture: ComponentFixture<MiniResumeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiniResumeCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiniResumeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
