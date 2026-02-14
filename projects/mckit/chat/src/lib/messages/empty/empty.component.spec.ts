import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCChatEmptyComponent } from './empty.component';

describe('MCChatEmptyComponent', () => {
  let component: MCChatEmptyComponent;
  let fixture: ComponentFixture<MCChatEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCChatEmptyComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MCChatEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
