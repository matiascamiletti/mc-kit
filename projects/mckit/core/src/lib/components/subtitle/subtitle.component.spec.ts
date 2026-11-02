import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MCSubtitle, SubtitleComponent } from './subtitle.component';

describe('SubtitleComponent', () => {
  let component: SubtitleComponent;
  let fixture: ComponentFixture<SubtitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubtitleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubtitleComponent);
    component = fixture.componentInstance;
    component.component = new MCSubtitle('Section Title');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the subtitle text inside an h2 element', () => {
    const h2: HTMLElement = fixture.nativeElement.querySelector('h2');
    expect(h2).toBeTruthy();
    expect(h2.textContent).toBe('Section Title');
  });
});
