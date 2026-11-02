import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MCMiniResumeCard } from './mini-resume-card.component';

describe('MCMiniResumeCard', () => {
  let component: MCMiniResumeCard;
  let fixture: ComponentFixture<MCMiniResumeCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCMiniResumeCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MCMiniResumeCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title, subtitle, and value inputs', () => {
    component.title = 'Revenue';
    component.subtitle = 'Monthly';
    component.value = '$12,500';
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('i')?.textContent).toBe('Revenue');
    expect(el.querySelector('.title')?.textContent).toBe('Monthly');
    expect(el.querySelector('.value')?.textContent).toBe('$12,500');
  });
});
