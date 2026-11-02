import { TestBed } from '@angular/core/testing';
import { UntypedFormArray, UntypedFormGroup, Validators } from '@angular/forms';
import { MCFormService } from './mc-form.service';
import { MCField } from '../entities/mc-field';
import { MCIftaField } from '../entities/mc-ifta-field';

describe('MCFormService', () => {
  let service: MCFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MCFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('MCField & MCIftaField entities', () => {
    it('should initialize MCField with init and initCustom', () => {
      const custom = MCField.initCustom('customKey', 'DummyComp', { foo: 'bar' });
      expect(custom.key).toBe('customKey');
      expect(custom.component).toBe('DummyComp');
      expect(custom.config).toEqual({ foo: 'bar' });

      const initField = MCField.init({
        key: 'name',
        component: 'DummyComp',
        validators: [Validators.required],
        default_value: 'John',
        disabled: true,
        no_control: false,
        extra: { placeholder: 'Enter name' }
      });
      expect(initField.key).toBe('name');
      expect(initField.config.placeholder).toBe('Enter name');
      expect(initField.config.default_value).toBe('John');
      expect(initField.config.disabled).toBeTrue();
    });

    it('should initialize MCIftaField with init', () => {
      const field = MCIftaField.init({
        key: 'email',
        component: 'DummyComp',
        label: 'Email Address',
        classes: 'w-full',
        extra: { customProp: 123 }
      });
      expect(field.key).toBe('email');
      expect(field.config.label).toBe('Email Address');
      expect(field.config.classes).toBe('w-full');
      expect(field.config.customProp).toBe(123);
    });
  });

  describe('createControl', () => {
    it('should create control with validators, default and disabled state', () => {
      const field = MCField.initCustom('title', null, {
        validators: [Validators.required],
        default: 'Initial',
        disabled: true
      });
      const control = service.createControl(field);
      expect(control.value).toBe('Initial');
      expect(control.disabled).toBeTrue();
      control.enable();
      control.setValue('');
      expect(control.valid).toBeFalse();
    });
  });

  describe('loadFields', () => {
    it('should load simple fields with item values, default values, and skip no_control or empty keys', () => {
      const group = new UntypedFormGroup({});
      const fields: MCField[] = [
        MCField.init({ key: 'firstName', component: null, default_value: 'DefaultFirst' }),
        MCField.init({ key: 'lastName', component: null, default_value: 'DefaultLast' }),
        MCField.init({ key: '', component: null }),
        MCField.init({ key: 'divider', component: null, no_control: true })
      ];

      service.loadFields(group, fields, { firstName: 'Alice' });

      expect(group.get('firstName')?.value).toBe('Alice');
      expect(group.get('lastName')?.value).toBe('DefaultLast');
      expect(group.get('divider')).toBeNull();
    });

    it('should load array fields and array string fields', () => {
      const group = new UntypedFormGroup({});
      const fields: MCField[] = [
        MCField.initCustom('items', null, {
          is_array: true,
          fields: [MCField.init({ key: 'name', component: null })]
        }),
        MCField.initCustom('tags', null, {
          is_array_string: true
        })
      ];

      service.loadFields(group, fields, {
        items: [{ name: 'Item 1' }, { name: 'Item 2' }],
        tags: ['tag1', 'tag2']
      });

      const itemsArray = group.get('items') as UntypedFormArray;
      expect(itemsArray.length).toBe(2);
      expect(itemsArray.at(0).get('name')?.value).toBe('Item 1');
      expect(itemsArray.at(1).get('name')?.value).toBe('Item 2');

      const tagsArray = group.get('tags') as UntypedFormArray;
      expect(tagsArray.length).toBe(2);
      expect(tagsArray.at(0).value).toBe('tag1');
      expect(tagsArray.at(1).value).toBe('tag2');
    });

    it('should load fields with children both in same group and in new group', () => {
      const group = new UntypedFormGroup({});
      const fields: MCField[] = [
        MCField.initCustom('row', null, {
          has_children: true,
          is_new_group: false,
          fields: [MCField.init({ key: 'inlineField', component: null })]
        }),
        MCField.initCustom('nested', null, {
          has_children: true,
          is_new_group: true,
          fields: [MCField.init({ key: 'subField', component: null })]
        })
      ];

      service.loadFields(group, fields, {
        inlineField: 'inlineVal',
        nested: { subField: 'subVal' }
      });

      expect(group.get('inlineField')?.value).toBe('inlineVal');
      expect(group.get('nested')?.get('subField')?.value).toBe('subVal');
    });
  });

  describe('patchValue', () => {
    it('should patch simple, array, array_string, and children fields', () => {
      const group = new UntypedFormGroup({});
      const fields: MCField[] = [
        MCField.init({ key: 'firstName', component: null, default_value: 'DefaultFirst' }),
        MCField.init({ key: 'noCtrl', component: null, no_control: true }),
        MCField.initCustom('items', null, {
          is_array: true,
          fields: [MCField.init({ key: 'name', component: null })]
        }),
        MCField.initCustom('tags', null, {
          is_array_string: true
        }),
        MCField.initCustom('row', null, {
          has_children: true,
          is_new_group: false,
          fields: [MCField.init({ key: 'inlineField', component: null })]
        })
      ];

      service.loadFields(group, fields, {
        firstName: 'Old',
        items: [{ name: 'OldItem' }],
        tags: ['oldTag'],
        inlineField: 'oldInline'
      });

      service.patchValue(group, fields, {
        firstName: 'New',
        items: [{ name: 'NewItem1' }, { name: 'NewItem2' }],
        tags: ['newTag1'],
        inlineField: 'newInline'
      });

      expect(group.get('firstName')?.value).toBe('New');
      expect((group.get('items') as UntypedFormArray).length).toBe(2);
      expect((group.get('items') as UntypedFormArray).at(1).get('name')?.value).toBe('NewItem2');
      expect((group.get('tags') as UntypedFormArray).length).toBe(1);
      expect((group.get('tags') as UntypedFormArray).at(0).value).toBe('newTag1');
      expect(group.get('inlineField')?.value).toBe('newInline');
    });

    it('should patch new group when control does not exist yet', () => {
      const group = new UntypedFormGroup({});
      const subFields = [MCField.init({ key: 'city', component: null })];
      service.loadFields(group, [
        MCField.initCustom('address', null, {
          has_children: true,
          is_new_group: true,
          fields: subFields
        })
      ], { address: { city: 'NYC' } });

      expect(group.get('address')?.get('city')?.value).toBe('NYC');

      const emptyGroup = new UntypedFormGroup({});
      service.patchValueInNewGroup(emptyGroup, subFields, 'address', { city: 'LA' });
      expect(emptyGroup.get('address')).toBeTruthy();
    });
  });
});
