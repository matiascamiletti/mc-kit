import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCFuseLayoutComponent } from './fuse-layout.component';

describe('MCFuseLayoutComponent', () => {
  let component: MCFuseLayoutComponent;
  let fixture: ComponentFixture<MCFuseLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCFuseLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MCFuseLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
