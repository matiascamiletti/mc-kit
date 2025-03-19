import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarWithMenuComponent } from './avatar-with-menu.component';

describe('AvatarWithMenuComponent', () => {
  let component: AvatarWithMenuComponent;
  let fixture: ComponentFixture<AvatarWithMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarWithMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvatarWithMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
