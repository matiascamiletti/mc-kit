import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemAdvancedFilterComponent } from './item-advanced-filter.component';

describe('ItemAdvancedFilterComponent', () => {
  let component: ItemAdvancedFilterComponent;
  let fixture: ComponentFixture<ItemAdvancedFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemAdvancedFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemAdvancedFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
