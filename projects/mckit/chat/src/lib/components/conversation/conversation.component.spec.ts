import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCConversationComponent } from './conversation.component';

describe('MCConversationComponent', () => {
  let component: MCConversationComponent;
  let fixture: ComponentFixture<MCConversationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCConversationComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MCConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
