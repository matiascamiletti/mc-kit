import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconToggleSidebarButtonComponent } from './icon-toggle-sidebar-button.component';

describe('IconToggleSidebarButtonComponent', () => {
  let component: IconToggleSidebarButtonComponent;
  let fixture: ComponentFixture<IconToggleSidebarButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconToggleSidebarButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconToggleSidebarButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
