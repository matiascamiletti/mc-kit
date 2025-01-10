import { Component, computed, input, output } from '@angular/core';
import { MCFilter, MCTypeFilter } from '../../entities/filter';
import { MCConditionResult, MCResultFilter } from '../../entities/result';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'mc-item-advanced-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownModule, InputTextModule, ButtonModule, DropdownModule],
  templateUrl: './item-advanced-filter.component.html',
  styleUrl: './item-advanced-filter.component.scss'
})
export class ItemAdvancedFilterComponent {
  filters = input.required<Array<MCFilter>>();
  result = input.required<MCResultFilter>();
  isFirst = input.required<boolean>();

  clickRemove = output();
  refresh = output();

  operators = MCResultFilter.getOperators();
  conditions = MCResultFilter.getConditions();
  operatorWhere = [
    { label: 'Where', value: 'where' },
  ];

  typeText = MCTypeFilter.TEXT;
  typeSelect = MCTypeFilter.SELECT;

  clickAddFilter(): void {
    this.result().childrens!.push(new MCResultFilter());
  }

  clickRemoveFilter(): void {
    this.clickRemove.emit();
  }

  onRefreshColumn() {
    this.result().value = undefined;

    if(this.result().filter?.isShowConditions == false){
      this.result().condition = MCConditionResult.EQUALS;
    }

    this.refresh.emit();
  }

  onRefresh() {
    this.refresh.emit();
  }
}
