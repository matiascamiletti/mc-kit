import { Component, signal } from '@angular/core';
import { MCFile, MCUploadFileService } from '@mckit/core';
import { MCField } from '../../entities/mc-field';
import { ArrayFieldComponent } from '../array-field/array-field.component';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';
import { concatMap, from, tap } from 'rxjs';

@Component({
  selector: 'mc-gallery-field',
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, TextareaModule, FileUploadModule],
  templateUrl: './gallery-field.component.html',
  styleUrl: './gallery-field.component.css'
})
export class GalleryFieldComponent extends ArrayFieldComponent {

  isSending = signal<boolean>(false);

  onUpload(event: FileSelectEvent) {
    this.isSending.set(true);

    // Verify if the element is FormArray
    if (!(this.group().get(this.field().key!) instanceof FormArray)) {
      // Create the form Array and set it in the group
      this.group().setControl(this.field().key!, new FormArray([]));
    }

    const service: MCUploadFileService = this.field().config.service;

    from(event.files)
    .pipe(
      concatMap((file: File) => service.upload(file)),
      tap((file: MCFile) => this.onAddFile(file))
    )
    .subscribe({
      complete: () => {
        this.isSending.set(false);
      }
    });

    
  }

  onAddFile(file: MCFile) {
    let formArray: FormArray<UntypedFormGroup> = (this.group().get(this.field().key!)) as FormArray<UntypedFormGroup>;

    let newGroup = new UntypedFormGroup({
      id: new FormControl<number|string|undefined>(file.id),
      name: new FormControl<string|undefined>(file.name),
      url: new FormControl<string|undefined>(file.url),
      size: new FormControl<number|undefined>(file.size),
      mime_type: new FormControl<string|undefined>(file.mime_type),
      alt_text: new FormControl<string>(''),
      is_primary: new FormControl<boolean>(false),
    });

    formArray.push(newGroup);
  }

  setPrimary(index: number): void {
    this.formArray().controls.forEach((group, i) => {
      group.get('is_primary')?.setValue(i === index ? 1 : 0);
    });
  }

  isPrimary(group: UntypedFormGroup): boolean {
    return group.get('is_primary')?.value === 1;
  }
}

export class GalleryField {

  static init(key: string, service: MCUploadFileService, data?: {
    labelAddButton?: string,
    labelTitlePanel?: string,
    allow_order?: boolean,
    allow_add?: boolean,
    classes?: string
  }): MCField {
    let field = MCField.init({
      key: key,
      component: GalleryFieldComponent,
    });
    field.config = {
      is_array: true,
      service: service,
      labelAddButton: data?.labelAddButton,
      labelTitlePanel: data?.labelTitlePanel,
      allow_order: data?.allow_order,
      allow_add: data?.allow_add ?? true,
      classes: data?.classes,
    }

    return field;
  }

}
