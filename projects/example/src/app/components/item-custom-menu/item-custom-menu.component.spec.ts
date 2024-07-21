import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCustomMenuComponent } from './item-custom-menu.component';

describe('ItemCustomMenuComponent', () => {
  let component: ItemCustomMenuComponent;
  let fixture: ComponentFixture<ItemCustomMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemCustomMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemCustomMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
