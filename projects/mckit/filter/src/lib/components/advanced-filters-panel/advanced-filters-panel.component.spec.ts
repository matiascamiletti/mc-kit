import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedFiltersPanelComponent } from './advanced-filters-panel.component';

describe('AdvancedFiltersPanelComponent', () => {
  let component: AdvancedFiltersPanelComponent;
  let fixture: ComponentFixture<AdvancedFiltersPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvancedFiltersPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvancedFiltersPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
