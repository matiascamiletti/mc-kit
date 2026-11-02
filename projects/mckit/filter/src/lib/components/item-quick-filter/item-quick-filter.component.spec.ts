import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemQuickFilterComponent } from './item-quick-filter.component';

describe('ItemQuickFilterComponent', () => {
  let component: ItemQuickFilterComponent;
  let fixture: ComponentFixture<ItemQuickFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemQuickFilterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemQuickFilterComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('item', { label: 'Active', value: 'active' });
    fixture.componentRef.setInput('isActive', true);
    fixture.detectChanges();
  });

  it('should create and display item label with active class', () => {
    expect(component).toBeTruthy();
    const div = fixture.nativeElement.querySelector('.subitem-quickfilter');
    expect(div.textContent).toContain('Active');
    expect(div.classList.contains('active')).toBeTrue();
  });
});
