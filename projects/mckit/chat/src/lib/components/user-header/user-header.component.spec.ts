import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MCUserHeaderChatComponent } from './user-header.component';

describe('MCUserHeaderChatComponent', () => {
  let component: MCUserHeaderChatComponent;
  let fixture: ComponentFixture<MCUserHeaderChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCUserHeaderChatComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MCUserHeaderChatComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('user', {
      id: '1',
      firstname: 'Alice',
      lastname: 'Walker',
      online: true
    });
    fixture.detectChanges();
  });

  it('should create and compute user initials', () => {
    expect(component).toBeTruthy();
    expect(component.getInitials()).toBe('AW');

    fixture.componentRef.setInput('user', {});
    fixture.detectChanges();
    expect(component.getInitials()).toBe('A1');
  });
});
