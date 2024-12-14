import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemQuickFilterComponent } from './item-quick-filter.component';

describe('ItemQuickFilterComponent', () => {
  let component: ItemQuickFilterComponent;
  let fixture: ComponentFixture<ItemQuickFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemQuickFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemQuickFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
