import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonacoFieldComponent } from './monaco-field.component';

describe('MonacoFieldComponent', () => {
  let component: MonacoFieldComponent;
  let fixture: ComponentFixture<MonacoFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonacoFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonacoFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
