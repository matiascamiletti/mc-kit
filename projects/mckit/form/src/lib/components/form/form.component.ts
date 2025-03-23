import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MCConfigForm } from '../../entities/mc-config-form';

@Component({
  selector: 'mc-form',
  imports: [CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class MCFormComponent {
  config = input.required<MCConfigForm>();
}
