import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NavigationEnd, provideRouter, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MCSidebarService } from '@mckit/layout-core';
import { MCLayoutAI } from './layout-ai.component';

describe('MCLayoutAI', () => {
  let component: MCLayoutAI;
  let fixture: ComponentFixture<MCLayoutAI>;
  let sidebarService: MCSidebarService;
  let routerEvents: Subject<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCLayoutAI],
      providers: [provideRouter([])],
    }).compileComponents();

    sidebarService = TestBed.inject(MCSidebarService);
    routerEvents = TestBed.inject(Router).events as unknown as Subject<any>;
    fixture = TestBed.createComponent(MCLayoutAI);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and initialize with welcome assistant message', () => {
    expect(component).toBeTruthy();
    expect(component.messages().length).toBe(1);
    expect(component.messages()[0].role).toBe('assistant');
  });

  it('should toggle and close sidebar', () => {
    sidebarService.isOpen.set(true);
    component.closeSidebar();
    expect(sidebarService.isOpen()).toBeFalse();

    component.toggleSidebar();
    expect(sidebarService.isOpen()).toBeTrue();
  });

  it('should toggle chat minimized state', () => {
    component.isChatMinimized.set(false);
    component.toggleChat();
    expect(component.isChatMinimized()).toBeTrue();

    component.toggleChat();
    expect(component.isChatMinimized()).toBeFalse();
    expect(component.isChatOpen()).toBeTrue();
  });

  it('should update currentSection when NavigationEnd fires', () => {
    routerEvents.next(new NavigationEnd(1, '/admin/user-settings', '/admin/user-settings'));
    expect(component.currentSection()).toBe('User Settings');
    expect(component.chatContextLabel()).toBe('User Settings');
  });

  it('should send user message and receive simulated assistant reply', fakeAsync(() => {
    const initialCount = component.messages().length;
    component.chatInput = 'Hello AI';
    component.sendMessage();

    expect(component.chatInput).toBe('');
    expect(component.messages().length).toBe(initialCount + 1);
    expect(component.messages()[initialCount].content).toBe('Hello AI');
    expect(component.messages()[initialCount].role).toBe('user');

    tick(600);
    expect(component.messages().length).toBe(initialCount + 2);
    expect(component.messages()[initialCount + 1].role).toBe('assistant');
  }));
});
