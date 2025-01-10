import { Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { MCMiniResumeCard } from '../../../../../mckit/layout/src/public-api';
import { MCSimplePage } from '../../../../../mckit/layout/src/lib/pages/simple-page/simple-page.component';
import { MenuItem } from 'primeng/api';
import { CurrencyPipe } from '@angular/common';
import { MCTwoColumnItemComponent } from '../../../../../mckit/layout/src/lib/lists/two-column-item/two-column-item.component';
import { MCTopbarService } from '../../../../../mckit/layout-core/src/public-api';
import { MCFilterOdataConverterService, MCFilterButtonComponent } from '../../../../../mckit/filter/src/public-api';
import { MCConfigFilter } from '../../../../../mckit/filter/src/lib/entities/config';
import { MCFilter } from '../../../../../mckit/filter/src/lib/entities/filter';
import { MCResultFilter } from '../../../../../mckit/filter/src/lib/entities/result';
import { MCChatbotButtonComponent } from "../../../../../mckit/chatbot/src/lib/components/chatbot-button/chatbot-button.component";
import { MCChatbotConfig } from '../../../../../mckit/chatbot/src/public-api';
import { MCChatbotMessage, MCChatbotMessageType } from '../../../../../mckit/chatbot/src/lib/entities/chatbot-message';

@Component({
  selector: 'app-test-page',
  standalone: true,
  imports: [MCSimplePage, MCMiniResumeCard, CurrencyPipe, MCTwoColumnItemComponent, MCFilterButtonComponent, MCChatbotButtonComponent],
  templateUrl: './test-page.component.html',
  styleUrl: './test-page.component.scss'
})
export class TestPageComponent implements OnInit {

  chatbotComp = viewChild.required<MCChatbotButtonComponent>('chatbot');

  odataConverter = inject(MCFilterOdataConverterService);

  breadcrumb: MenuItem[] = [
    { label: 'Home', routerLink: '/' },
    { label: 'Test Page' }
  ];

  filterConfig = new MCConfigFilter();

  chatbotConfig = new MCChatbotConfig();

  messages = signal<Array<MCChatbotMessage>>([]);

  constructor(
    protected topbarService: MCTopbarService
  ) { }

  ngOnInit(): void {
    this.topbarService.subtitle.update(() => 'Test Page');
    this.loadFilterConfig();
    this.loadChatBot();
  }

  ngAfterViewInit(): void {
  }

  onFilter(filters: Array<MCResultFilter>) {
    console.log(filters);
    console.log(this.odataConverter.convert(filters));
  }

  loadFilterConfig() {
    this.filterConfig.filters = [
      MCFilter.textQuickFilter({
        title: 'Game #',
        key: 'game_number',
        options: [
          { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3', value: '3' },
            { label: '4', value: '4' },
            { label: '5', value: '5' },
            { label: '6', value: '6' },
            { label: '7', value: '7' },
            { label: '8', value: '8' },
            { label: '9', value: '9' },
            { label: '10', value: '10' }
        ]
      }),
      MCFilter.selectQuickFilter({
        title: 'Status',
        key: 'status',
        options: [
          { label: 'In progress', value: 'In progress' },
          { label: 'Completed', value: 'Completed' },
          { label: 'Cancelled', value: 'Cancelled' },
        ],
        placeholder: 'Select a status'
      }),
      MCFilter.textQuickFilter({
        title: 'Field',
        key: 'field',
        options: [
          { label: 'Field La bombonera', value: 'Field La bombonera' },
        ]
      }),
    ];
  }

  onSendMessage(message: MCChatbotMessage) {
    this.messages.set([
      ...this.messages(),
      message
    ]);
    this.chatbotComp().showLoading();
  }

  onOpenChatBot() {
    this.messages.set([
      {
        sender: 'AI',
        message: 'Hi, how can I help you today?',
        type: MCChatbotMessageType.BOT
      }
    ]);
  }

  loadChatBot() {
    this.chatbotConfig.title = 'Chatbot';
    this.chatbotConfig.subtitle = 'Powered by TOTS';
    this.chatbotConfig.inputPlaceholder = 'Write a message';
    this.chatbotConfig.sendButton = 'Send';
  }
}
