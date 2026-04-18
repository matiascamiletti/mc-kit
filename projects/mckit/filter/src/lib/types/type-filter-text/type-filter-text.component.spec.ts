import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeFilterTextComponent } from './type-filter-text.component';

describe('TypeFilterTextComponent', () => {
  let component: TypeFilterTextComponent;
  let fixture: ComponentFixture<TypeFilterTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeFilterTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeFilterTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
