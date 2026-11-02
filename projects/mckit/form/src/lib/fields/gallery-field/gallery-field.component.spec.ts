import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { MCFile, MCUploadFileService } from '@mckit/core';
import { GalleryField, GalleryFieldComponent } from './gallery-field.component';
import { FileSelectEvent } from 'primeng/fileupload';

describe('GalleryFieldComponent', () => {
  let component: GalleryFieldComponent;
  let fixture: ComponentFixture<GalleryFieldComponent>;
  let uploadServiceSpy: jasmine.SpyObj<MCUploadFileService>;
  let group: UntypedFormGroup;

  beforeEach(async () => {
    uploadServiceSpy = jasmine.createSpyObj('MCUploadFileService', ['upload']);
    const uploadedFile: MCFile = {
      id: 10,
      name: 'photo.jpg',
      url: 'https://example.com/photo.jpg',
      size: 2048,
      mime_type: 'image/jpeg'
    };
    uploadServiceSpy.upload.and.returnValue(of(uploadedFile));

    await TestBed.configureTestingModule({
      imports: [GalleryFieldComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalleryFieldComponent);
    component = fixture.componentInstance;

    const field = GalleryField.init('gallery', uploadServiceSpy, {
      labelTitlePanel: 'Photos',
      labelAddButton: 'Upload Photo'
    });
    group = new UntypedFormGroup({
      gallery: new FormArray([])
    });

    fixture.componentRef.setInput('field', field);
    fixture.componentRef.setInput('group', group);
    fixture.detectChanges();
  });

  it('should create and initialize GalleryField config', () => {
    expect(component).toBeTruthy();
    expect(component.field().config.is_array).toBeTrue();
    expect(component.field().config.fields.length).toBe(7);
  });

  it('should upload files, add to formArray, and manage primary image', () => {
    const fakeFile = new File(['content'], 'photo.jpg', { type: 'image/jpeg' });
    component.onUpload({ files: [fakeFile] } as unknown as FileSelectEvent);

    expect(uploadServiceSpy.upload).toHaveBeenCalledWith(fakeFile);
    expect(component.isSending()).toBeFalse();
    expect(component.formArray().length).toBe(1);
    expect(component.formArray().at(0).get('url')?.value).toBe('https://example.com/photo.jpg');

    component.onAddFile({
      id: 11,
      name: 'second.jpg',
      url: 'https://example.com/second.jpg',
      size: 1024,
      mime_type: 'image/jpeg'
    });
    expect(component.formArray().length).toBe(2);

    component.setPrimary(1);
    expect(component.isPrimary(component.formArray().at(0))).toBeFalse();
    expect(component.isPrimary(component.formArray().at(1))).toBeTrue();
  });

  it('should create FormArray on upload if control is not a FormArray', () => {
    group.setControl('gallery', new UntypedFormControl(null));
    const fakeFile = new File(['content'], 'photo.jpg', { type: 'image/jpeg' });
    component.onUpload({ files: [fakeFile] } as unknown as FileSelectEvent);
    expect(group.get('gallery') instanceof FormArray).toBeTrue();
    expect((group.get('gallery') as FormArray).length).toBe(1);
  });
});
