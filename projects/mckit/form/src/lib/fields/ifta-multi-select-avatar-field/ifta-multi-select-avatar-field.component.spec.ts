import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { IftaMultiSelectAvatarField, IftaMultiSelectAvatarFieldComponent } from './ifta-multi-select-avatar-field.component';

describe('IftaMultiSelectAvatarFieldComponent', () => {
  let component: IftaMultiSelectAvatarFieldComponent;
  let fixture: ComponentFixture<IftaMultiSelectAvatarFieldComponent>;
  let control: UntypedFormControl;
  let group: UntypedFormGroup;

  const mockUsers = [
    { id: 1, name: 'Alice Smith', email: 'alice@example.com', photo: 'https://example.com/a.jpg' },
    { id: 2, name: 'Bob', email: 'bob@example.com', photo: '' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', photo: 'https://example.com/c.jpg' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IftaMultiSelectAvatarFieldComponent],
      providers: [provideNoopAnimations()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IftaMultiSelectAvatarFieldComponent);
    component = fixture.componentInstance;

    const field = IftaMultiSelectAvatarField.init(
      'assignees',
      'Assignees',
      () => of(mockUsers),
      'name',
      'id',
      {
        optionImage: 'photo',
        optionSubLabel: 'email',
        maxSelectedAvatars: 2,
        on_change: (selected: any[]) => ({ count: selected?.length ?? 0 })
      }
    );

    control = new UntypedFormControl([1]);
    group = new UntypedFormGroup({
      assignees: control,
      count: new UntypedFormControl(0)
    });

    fixture.componentRef.setInput('field', field);
    fixture.componentRef.setInput('control', control);
    fixture.componentRef.setInput('group', group);
    fixture.detectChanges();
  });

  it('should create and load options', () => {
    expect(component).toBeTruthy();
    expect(component.options().length).toBe(3);
    expect(component.isLoading()).toBeFalse();
  });

  it('should resolve items, images, labels, sublabels, and initials', () => {
    expect(component.resolveItem(1)).toEqual(mockUsers[0]);
    expect(component.resolveItem(mockUsers[1])).toEqual(mockUsers[1]);
    expect(component.resolveItem(null)).toBeNull();

    expect(component.getUserImage(1)).toBe('https://example.com/a.jpg');
    expect(component.getUserImage(2)).toBeNull();
    expect(component.getUserImage(null)).toBeNull();

    expect(component.getUserLabel(1)).toBe('Alice Smith');
    expect(component.getUserLabel('')).toBe('');

    expect(component.getUserSubLabel(1)).toBe('alice@example.com');
    expect(component.getUserSubLabel(null)).toBeNull();

    expect(component.getUserInitials(1)).toBe('AS');
    expect(component.getUserInitials(2)).toBe('BO');
    expect(component.getUserInitials(null)).toBe('?');
  });

  it('should compute visible users, remaining count, tooltip, filter fields, and image errors', () => {
    const selected = [1, 2, 3];
    expect(component.getVisibleUsers(selected)).toEqual([1, 2]);
    expect(component.getVisibleUsers(null)).toEqual([]);
    expect(component.getRemainingCount(selected)).toBe(1);
    expect(component.getRemainingCount(null)).toBe(0);
    expect(component.getRemainingUsersTooltip(selected)).toBe('Charlie Brown');
    expect(component.getRemainingUsersTooltip([1])).toBe('');

    expect(component.getFilterFields()).toBe('name,email');

    expect(component.hasImgError('https://example.com/a.jpg')).toBeFalse();
    component.onImgError('https://example.com/a.jpg');
    expect(component.hasImgError('https://example.com/a.jpg')).toBeTrue();
    expect(component.hasImgError(null)).toBeTrue();
  });

  it('should trigger on_change and patch group values when control changes', () => {
    control.setValue([1, 2]);
    expect(group.get('count')?.value).toBe(2);
  });

  it('should handle array, observable, and error option sources', () => {
    const arrayField = IftaMultiSelectAvatarField.init('u', 'U', mockUsers, 'name', 'id', 'photo');
    fixture.componentRef.setInput('field', arrayField);
    component.loadOptions();
    expect(component.options().length).toBe(3);

    arrayField.config.optionObs = () => throwError(() => new Error('Fail'));
    component.loadOptions();
    expect(component.isLoading()).toBeFalse();

    arrayField.config.optionObs = null;
    component.loadOptions();
    expect(component.options()).toEqual([]);
  });
});
