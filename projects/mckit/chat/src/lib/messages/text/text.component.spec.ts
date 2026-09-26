import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCMessageTextComponent } from './text.component';

describe('MCMessageTextComponent', () => {
  let component: MCMessageTextComponent;
  let fixture: ComponentFixture<MCMessageTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCMessageTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MCMessageTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
