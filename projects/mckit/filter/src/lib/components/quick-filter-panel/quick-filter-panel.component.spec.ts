import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickFilterPanelComponent } from './quick-filter-panel.component';

describe('QuickFilterPanelComponent', () => {
  let component: QuickFilterPanelComponent;
  let fixture: ComponentFixture<QuickFilterPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickFilterPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickFilterPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
