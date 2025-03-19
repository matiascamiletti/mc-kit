import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCPageHeadingComponent } from './page-heading.component';

describe('MCPageHeadingComponent', () => {
  let component: MCPageHeadingComponent;
  let fixture: ComponentFixture<MCPageHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCPageHeadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MCPageHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
