import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { SelectChangeEvent, SelectFilterEvent } from 'primeng/select';
import { IftaSelectObsField, IftaSelectObsFieldComponent } from './ifta-select-obs-field.component';

describe('IftaSelectObsFieldComponent', () => {
  let component: IftaSelectObsFieldComponent;
  let fixture: ComponentFixture<IftaSelectObsFieldComponent>;
  let control: UntypedFormControl;
  let group: UntypedFormGroup;

  const mockOptions = [
    { id: 1, name: 'Option One', code: 'O1' },
    { id: 2, name: 'Option Two', code: 'O2' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IftaSelectObsFieldComponent],
      providers: [provideNoopAnimations()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IftaSelectObsFieldComponent);
    component = fixture.componentInstance;

    const field = IftaSelectObsField.init(
      'itemId',
      'Select Item',
      () => of(mockOptions),
      'name',
      'id',
      {
        on_change: (selected: any) => (selected ? { mirroredName: selected.name } : undefined),
        extra_params: { extraCode: 'code' },
        with_filter: true,
        on_filter: (query: string) => of(mockOptions.filter(o => o.name.includes(query)))
      }
    );

    control = new UntypedFormControl(null);
    group = new UntypedFormGroup({
      itemId: control,
      mirroredName: new UntypedFormControl('')
    });

    fixture.componentRef.setInput('field', field);
    fixture.componentRef.setInput('control', control);
    fixture.componentRef.setInput('group', group);
    fixture.detectChanges();
  });

  it('should create, load options, and add extra_params controls', () => {
    expect(component).toBeTruthy();
    expect(component.options().length).toBe(2);
    expect(group.get('extraCode')).toBeTruthy();
  });

  it('should patch group via on_change when control value changes', () => {
    control.setValue(2);
    expect(group.get('mirroredName')?.value).toBe('Option Two');
  });

  it('should set extra_params controls on onChange', () => {
    component.onChange({ value: 1 } as SelectChangeEvent);
    expect(group.get('extraCode')?.value).toBe('O1');
  });

  it('should filter options via on_filter and reload all options when filter is empty', () => {
    component.onFilter({ filter: 'Two' } as SelectFilterEvent);
    expect(component.options().length).toBe(1);
    expect(component.options()[0].id).toBe(2);

    component.onFilter({ filter: '' } as SelectFilterEvent);
    expect(component.options().length).toBe(2);
  });
});
