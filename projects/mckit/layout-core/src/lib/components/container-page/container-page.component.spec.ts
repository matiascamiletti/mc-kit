import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MCContainerPageComponent } from './container-page.component';
import { MCRightHeaderPageTemplateDirective } from '../../directives/mc-right-header-page-template.directive';

@Component({
  standalone: true,
  imports: [MCContainerPageComponent, MCRightHeaderPageTemplateDirective],
  template: `
    <mc-container-page [title]="'Dashboard'" [subtitle]="'Overview'">
      <ng-template mcRightHeaderPageTemplate>
        <button class="custom-header-btn">Action</button>
      </ng-template>
      <div class="projected-body">Body Content</div>
    </mc-container-page>
  `
})
class TestHostComponent {}

describe('MCContainerPageComponent', () => {
  let component: MCContainerPageComponent;
  let fixture: ComponentFixture<MCContainerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCContainerPageComponent, TestHostComponent],
      providers: [provideRouter([])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MCContainerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle isShowMoreOptions when toggleMoreOptions is called', () => {
    expect(component.isShowMoreOptions()).toBeFalse();
    component.toggleMoreOptions();
    expect(component.isShowMoreOptions()).toBeTrue();
    component.toggleMoreOptions();
    expect(component.isShowMoreOptions()).toBeFalse();
  });

  it('should render rightHeaderTemplate and projected content in host', () => {
    const hostFixture = TestBed.createComponent(TestHostComponent);
    hostFixture.detectChanges();

    const headerBtn = hostFixture.nativeElement.querySelector('.custom-header-btn');
    const bodyContent = hostFixture.nativeElement.querySelector('.projected-body');
    expect(headerBtn).toBeTruthy();
    expect(headerBtn.textContent).toBe('Action');
    expect(bodyContent).toBeTruthy();
    expect(bodyContent.textContent).toBe('Body Content');
  });
});
