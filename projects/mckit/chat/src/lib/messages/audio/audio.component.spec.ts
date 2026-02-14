import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCMessageAudioComponent } from './audio.component';

describe('MCMessageAudioComponent', () => {
  let component: MCMessageAudioComponent;
  let fixture: ComponentFixture<MCMessageAudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCMessageAudioComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MCMessageAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
