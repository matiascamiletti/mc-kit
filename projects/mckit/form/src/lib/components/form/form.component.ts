import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MCConfigForm } from '../../entities/mc-config-form';
import { PrintFieldComponent } from '../print-field/print-field.component';

@Component({
  selector: 'mc-form',
  imports: [CommonModule, PrintFieldComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class MCFormComponent {
  config = input.required<MCConfigForm>();
}
