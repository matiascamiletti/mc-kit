import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCMessageImageComponent } from './image.component';

describe('ImageComponent', () => {
  let component: MCMessageImageComponent;
  let fixture: ComponentFixture<MCMessageImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCMessageImageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MCMessageImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
