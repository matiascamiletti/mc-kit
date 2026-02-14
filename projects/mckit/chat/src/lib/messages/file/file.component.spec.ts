import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCMessageFileComponent } from './file.component';

describe('MCMessageFileComponent', () => {
  let component: MCMessageFileComponent;
  let fixture: ComponentFixture<MCMessageFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCMessageFileComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MCMessageFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
