import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Message } from 'primeng/message';
import { MCMessage } from '../../entities/mc-message';
import { MCMessagesService } from '../../services/mc-messages.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mc-messages',
  standalone: true,
  imports: [CommonModule, Message],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MCMessagesComponent implements OnInit, OnDestroy {
  messages = signal<MCMessage[]>([]);

  messageService = inject(MCMessagesService);

  subscription?: Subscription;

  ngOnInit(): void {
    this.subscription = this.messageService.observe()
    .subscribe(messages => {
      this.messages.set(messages);
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
