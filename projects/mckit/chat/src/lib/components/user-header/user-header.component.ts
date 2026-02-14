import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { MCUserChat } from '../../entities/user';

@Component({
  selector: 'mc-user-header-chat',
  imports: [CommonModule, AvatarModule],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.css'
})
export class MCUserHeaderChatComponent {
  user = input.required<MCUserChat>();

  getInitials(): string {
    const initials = ((this.user().firstname?.charAt(0) ?? '') + (this.user().lastname?.charAt(0) ?? '')).toUpperCase();
    return initials ? initials : 'A1';
  }
}
