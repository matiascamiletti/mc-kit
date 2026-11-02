import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MCTwoColumnItemComponent } from './two-column-item.component';

describe('MCTwoColumnItemComponent', () => {
  let component: MCTwoColumnItemComponent;
  let fixture: ComponentFixture<MCTwoColumnItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCTwoColumnItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MCTwoColumnItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title, subtitle, and value', () => {
    component.title = 'Plan';
    component.subtitle = 'Enterprise Tier';
    component.value = 'Active';
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.main')?.textContent).toBe('Plan');
    expect(el.querySelector('.subtitle')?.textContent).toBe('Enterprise Tier');
    expect(el.querySelector('.right span')?.textContent).toBe('Active');
  });
});
