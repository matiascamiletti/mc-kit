import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtitleInTopbarComponent } from './subtitle-in-topbar.component';

describe('SubtitleInTopbarComponent', () => {
  let component: SubtitleInTopbarComponent;
  let fixture: ComponentFixture<SubtitleInTopbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubtitleInTopbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubtitleInTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
