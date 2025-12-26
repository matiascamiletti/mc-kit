import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCContainerPageComponent } from './container-page.component';

describe('MCContainerPageComponent', () => {
  let component: MCContainerPageComponent;
  let fixture: ComponentFixture<MCContainerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCContainerPageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MCContainerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
