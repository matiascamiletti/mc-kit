import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutAi } from './layout-ai';

describe('LayoutAi', () => {
  let component: LayoutAi;
  let fixture: ComponentFixture<LayoutAi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutAi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutAi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
