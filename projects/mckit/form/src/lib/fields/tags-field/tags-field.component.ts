import { Component } from '@angular/core';
import { MCFieldComponent } from '../mc-field.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MCField } from '../../entities/mc-field';

@Component({
  selector: 'mc-tags-field',
  imports: [CommonModule, ReactiveFormsModule, AutoCompleteModule],
  templateUrl: './tags-field.component.html',
  styleUrl: './tags-field.component.css'
})
export class TagsFieldComponent extends MCFieldComponent {

}

export class TagsField {

  static init(key: string|undefined): MCField {
    return MCField.init({
      key: key,
      component: TagsFieldComponent
    });
  }

}
