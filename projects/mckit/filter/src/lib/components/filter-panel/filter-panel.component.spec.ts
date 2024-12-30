import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCFilterPanelComponent } from './filter-panel.component';

describe('FilterPanelComponent', () => {
  let component: MCFilterPanelComponent;
  let fixture: ComponentFixture<MCFilterPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCFilterPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MCFilterPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
