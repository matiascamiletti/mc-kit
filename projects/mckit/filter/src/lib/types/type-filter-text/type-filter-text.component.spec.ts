import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TypeFilterTextComponent } from './type-filter-text.component';
import { MCResultFilter } from '../../entities/result';

describe('TypeFilterTextComponent', () => {
  let component: TypeFilterTextComponent;
  let fixture: ComponentFixture<TypeFilterTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeFilterTextComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TypeFilterTextComponent);
    component = fixture.componentInstance;
    const result = new MCResultFilter();
    result.value = 'initial text';
    fixture.componentRef.setInput('result', result);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.result().value).toBe('initial text');
  });
});
