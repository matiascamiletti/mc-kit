import { CommonModule } from '@angular/common';
import {
  afterNextRender,
  Component,
  inject,
  OnInit,
  OnDestroy,
  signal,
  computed,
  WritableSignal,
} from '@angular/core';
import {
  Router,
  RouterModule,
  NavigationEnd,
  ActivatedRoute,
} from '@angular/router';
import { PrintServiceComponent } from '@mckit/core';
import {
  ID_FOOTER_MC_COMPONENT,
  ID_SIDEBAR_MC_COMPONENT,
  ID_TOPBAR_MC_COMPONENT,
  MCSidebarService,
} from '@mckit/layout-core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';

export interface MCLayoutAIMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  context?: string;
}

@Component({
  selector: 'mc-layout-ai',
  imports: [
    CommonModule,
    RouterModule,
    PrintServiceComponent,
    ButtonModule,
    InputTextModule,
    AvatarModule,
    BadgeModule,
    TooltipModule,
    FormsModule,
  ],
  templateUrl: './layout-ai.component.html',
  styleUrl: './layout-ai.component.scss',
})
export class MCLayoutAI implements OnInit, OnDestroy {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  sidebarService: MCSidebarService = inject(MCSidebarService);

  // Layout IDs
  sidebarId = ID_SIDEBAR_MC_COMPONENT;
  topbarLeftId = ID_TOPBAR_MC_COMPONENT + '_left';
  topbarRightId = ID_TOPBAR_MC_COMPONENT + '_right';
  footerId = ID_FOOTER_MC_COMPONENT;

  // Sidebar state
  isOpen: WritableSignal<boolean> = this.sidebarService.isOpen;
  isDesktop = signal<boolean>(false);

  // Chat state
  isChatOpen = signal<boolean>(true);
  isChatMinimized = signal<boolean>(false);
  chatInput = '';
  messages = signal<MCLayoutAIMessage[]>([]);
  currentSection = signal<string>('Home');
  currentRoute = signal<string>('/');

  // Computed
  chatContextLabel = computed(() => {
    return this.currentSection();
  });

  constructor() {
    afterNextRender(() => {
      this.initResponsive();
    });
  }

  ngOnInit() {
    // Track route changes to update context
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateContext(event.urlAfterRedirects || event.url);
      });

    // Set initial context
    this.updateContext(this.router.url);

    if (typeof window !== 'undefined') {
      this.isDesktop.set(window.innerWidth >= 768);
      window.addEventListener('resize', this.onResize);
    }

    // Welcome message
    this.messages.update((msgs) => [
      ...msgs,
      {
        id: crypto.randomUUID(),
        content: `Welcome! I'm your AI assistant. I can see you're currently in the "${this.currentSection()}" section. How can I help you?`,
        role: 'assistant',
        timestamp: new Date(),
        context: this.currentSection(),
      },
    ]);
  }

  ngOnDestroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize);
    }
  }

  onResize = () => {
    const desktop = window.innerWidth >= 768;
    this.isDesktop.set(desktop);
    if (!desktop) {
      this.sidebarService.isOpen.set(false);
    }
  };

  initResponsive() {
    if (!this.isDesktop()) {
      this.sidebarService.isOpen.set(false);
      this.isChatMinimized.set(true);
    }
  }

  // Sidebar methods
  closeSidebar() {
    this.sidebarService.isOpen.set(false);
  }

  toggleSidebar() {
    this.sidebarService.isOpen.update((v) => !v);
  }

  // Chat methods
  toggleChat() {
    if (this.isChatMinimized()) {
      this.isChatMinimized.set(false);
      this.isChatOpen.set(true);
    } else {
      this.isChatMinimized.set(true);
    }
  }

  sendMessage() {
    if (!this.chatInput.trim()) return;

    const userMessage: MCLayoutAIMessage = {
      id: crypto.randomUUID(),
      content: this.chatInput,
      role: 'user',
      timestamp: new Date(),
      context: this.currentSection(),
    };

    this.messages.update((msgs) => [...msgs, userMessage]);
    this.chatInput = '';

    // Simulate assistant response with context awareness
    setTimeout(() => {
      const assistantMessage: MCLayoutAIMessage = {
        id: crypto.randomUUID(),
        content: `I understand you're asking about something in the "${this.currentSection()}" section. I'm processing your request...`,
        role: 'assistant',
        timestamp: new Date(),
        context: this.currentSection(),
      };
      this.messages.update((msgs) => [...msgs, assistantMessage]);
    }, 600);
  }

  onChatKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  private updateContext(url: string) {
    this.currentRoute.set(url);
    // Extract section name from URL
    const segments = url.split('/').filter((s) => s);
    const section = segments.length > 1 ? segments[segments.length - 1] : segments[0] || 'Home';
    const formattedSection = section
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
    this.currentSection.set(formattedSection);
  }
}
