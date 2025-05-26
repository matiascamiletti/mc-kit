import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSplitPageComponent } from './register-split-page.component';

describe('RegisterSplitPageComponent', () => {
  let component: RegisterSplitPageComponent;
  let fixture: ComponentFixture<RegisterSplitPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterSplitPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterSplitPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
