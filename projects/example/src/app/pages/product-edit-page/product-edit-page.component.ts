import { CommonModule } from '@angular/common';
import { Component, signal, viewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { QuillField } from '@mckit/quill-field';
import { ArrayField, IftaMultiSelectObsField, IftaSelectField, IftaSelectObsField, IftaSubSelectObsField, ColumnField, DividerField, FieldsetField, HiddenField, IftaTextareaField, IftaTextField, MCConfigForm, MCEventForm, MCForm, RowField, SubmitButtonField, TagsField, ConditionalFuncField, IftaCurrencyField, GalleryField } from '../../../../../mckit/form/src/public-api';
import { delay, of } from 'rxjs';
import { MCFile } from '@mckit/core';

@Component({
  selector: 'app-product-edit-page',
  imports: [CommonModule, MCForm],
  templateUrl: './product-edit-page.component.html',
  styleUrl: './product-edit-page.component.scss'
})
export class ProductEditPageComponent {
  formComponent = viewChild(MCForm);

  formConfig = signal<MCConfigForm>(new MCConfigForm());

  ngOnInit(): void {
    this.loadForm();
  }

  onSubmit(result: any) {
    setTimeout(() => {
      this.formComponent()?.emitEvent(MCEventForm.init('stop-loading'));
    }, 2000);
  }

  onEventForm(event: MCEventForm) {
    console.log(event);

    switch (event.key) {
      case 'submit':
        this.onSubmit(event.content);
        break;
    }
  }

  loadForm() {
    let config = this.formConfig();
    config.item = {
      lastname: 'Doe',
      address: {
        country: 'mexico'
      }
    };
    config.fields = [
      
      RowField.init([

        ColumnField.init([

          FieldsetField.init('Basic Information', [

            IftaTextField.init('name', 'Name', { validators: [Validators.required], extra: { containerFieldClass: 'mb-3 w-full' } }),

            RowField.init([
              IftaTextField.init('slug', 'Slug', { validators: [Validators.required], extra: { containerFieldClass: 'w-full' } }),
              IftaSelectField.init('status', 'Status', [
                { label: 'Active', value: 1 },
                { label: 'Inactive', value: 0 },
              ], 'label', 'value', {default_value: 1}),
            ]),

            DividerField.init('Description'),
            QuillField.init('content'),
          ]),


          FieldsetField.init('Variants', [
            ArrayField.init(
                    'variants',
                    [
                      HiddenField.init('id'),

                      ArrayField.init('types', [
                        RowField.init([
                          IftaSelectObsField.init('type_id', 'Type', () => of([
                                  { id: 'talle', title: 'Talle' },
                                  { id: 'color', title: 'Color' },
                                ]), 'title', 'id', { classes: 'w-100' }),
                          IftaSubSelectObsField.init('value_id', 'Values', 'type_id', (type: string) => of(
                                  type == 'talle' ? [{ id: 'talle-1', title: 'Talle 1' }] : [{ id: 'color-1', title: 'Color 1' }]
                                ), 'title', 'id', { classes: 'w-100' }),
                        ], { classes: 'w-full flex flex-row', containerFieldClass: 'w-full' })
                      ], { labelAddButton: 'Add Type', labelTitlePanel: 'Type', allow_order: false, classes: 'w-full flex flex-col gap-2' }),

                      RowField.init([
                        ConditionalFuncField.init((values: any) => {
                          if(values && values.types && Array.isArray(values.types) && values.types.length == 0) {
                            return true;
                          }
                          return false;
                        }, [
                          IftaTextField.init('name', 'Name variant'),
                        ]),
                        IftaTextField.init('sku', 'SKU'),
                        IftaCurrencyField.init('price', 'Price'),
                        IftaTextField.init('stock', 'Stock'),
                      ], { containerFieldClass: 'w-full' }),
                    ],
                    { labelAddButton: 'Add Variant', labelTitlePanel: 'Variant', allow_order: true }
                  ),
          ]),

        ]),

        ColumnField.init([

          FieldsetField.init('Categories', [
            IftaMultiSelectObsField.init('categories', 'Categories', () => of([
                    { id: 'client-1', title: 'Client 1' },
                    { id: 'client-2', title: 'Client 2' },
                    { id: 'client-3', title: 'Client 3' },
                    { id: 'client-4', title: 'Client 4' },
                    { id: 'client-5', title: 'Client 5' }
                  ]), 'title', 'id'),
          ]),

          FieldsetField.init('Media', [

            GalleryField.init('images', {
              upload(file: File) {
                return of({
                  url: 'https://primefaces.org/cdn/primeng/images/galleria/galleria10.jpg',
                } as MCFile).pipe(delay(3000));
              },

              filename(file: File) {
                return 'image.png';
              },
            }, { labelAddButton: 'Add Image', labelTitlePanel: 'Product Images' }),

          ]),

        ]),

      ], { itemClasses: ['w-2/3', 'w-1/3'] }),
      SubmitButtonField.init('submit', 'Submit', { icon: 'pi pi-check' })
    ];

    this.formConfig.set(config);
  }
}
