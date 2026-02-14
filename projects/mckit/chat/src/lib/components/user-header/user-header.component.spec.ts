import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCUserHeaderChatComponent } from './user-header.component';

describe('MCUserHeaderChatComponent', () => {
  let component: MCUserHeaderChatComponent;
  let fixture: ComponentFixture<MCUserHeaderChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCUserHeaderChatComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MCUserHeaderChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
