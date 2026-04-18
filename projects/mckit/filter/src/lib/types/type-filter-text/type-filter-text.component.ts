import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MCResultFilter } from '../../entities/result';

@Component({
  selector: 'mc-type-filter-text',
  imports: [CommonModule, FormsModule, InputTextModule],
  templateUrl: './type-filter-text.component.html',
  styleUrl: './type-filter-text.component.css'
})
export class TypeFilterTextComponent {
  result = input.required<MCResultFilter>();
}
