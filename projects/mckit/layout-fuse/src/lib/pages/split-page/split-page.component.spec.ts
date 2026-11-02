import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MCSplitPageComponent } from './split-page.component';

describe('MCSplitPageComponent', () => {
  let component: MCSplitPageComponent;
  let fixture: ComponentFixture<MCSplitPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCSplitPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MCSplitPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept left and right content inputs', () => {
    fixture.componentRef.setInput('leftTitle', 'Left Heading');
    fixture.componentRef.setInput('leftSubtitle', 'Left Sub');
    fixture.componentRef.setInput('rightTitle', 'Right Heading');
    fixture.componentRef.setInput('rightSubtitle', 'Right Sub');
    fixture.componentRef.setInput('rightText', 'Right description text');
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Left Heading');
    expect(text).toContain('Right Heading');
    expect(text).toContain('Right description text');
  });
});
