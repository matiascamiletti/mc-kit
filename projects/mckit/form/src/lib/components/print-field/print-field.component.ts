import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit, ViewContainerRef } from '@angular/core';
import { MCField } from '../../entities/mc-field';
import { MCFieldComponent } from '../../fields/mc-field.component';

@Component({
  selector: 'mc-print-field',
  imports: [CommonModule],
  template: '',
  styleUrl: './print-field.component.css'
})
export class PrintFieldComponent implements OnInit {

  field = input.required<MCField>();

  viewContainerRef = inject(ViewContainerRef);

  ngOnInit(): void {
    const view = this.viewContainerRef.createComponent(this.field().component);
    view.setInput('field', this.field());
  }
}
