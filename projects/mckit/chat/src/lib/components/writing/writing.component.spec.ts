import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCWritingComponent } from './writing.component';

describe('MCWritingComponent', () => {
  let component: MCWritingComponent;
  let fixture: ComponentFixture<MCWritingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCWritingComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MCWritingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
