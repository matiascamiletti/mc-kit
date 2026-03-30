import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutAiComponent } from './layout-ai.component';

describe('LayoutAiComponent', () => {
  let component: LayoutAiComponent;
  let fixture: ComponentFixture<LayoutAiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutAiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutAiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
