import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeFilterSelectComponent } from './type-filter-select.component';

describe('TypeFilterSelectComponent', () => {
  let component: TypeFilterSelectComponent;
  let fixture: ComponentFixture<TypeFilterSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeFilterSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeFilterSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
