import { Component, computed, input, output, OnInit } from '@angular/core';
import { MCFilter, MCTypeFilter } from '../../entities/filter';
import { MCConditionResult, MCResultFilter } from '../../entities/result';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { MCItemFilter } from '../../entities/item-filter';
import { MultiSelectModule } from 'primeng/multiselect';

export interface MCAdvancedFilterConfig {
  initialFilters?: MCResultFilter[];
}

@Component({
  selector: 'mc-item-advanced-filter',
  imports: [CommonModule, FormsModule, DropdownModule, InputTextModule, ButtonModule, DropdownModule, AutoCompleteModule, MultiSelectModule],
  templateUrl: './item-advanced-filter.component.html',
  styleUrl: './item-advanced-filter.component.scss'
})
export class ItemAdvancedFilterComponent implements OnInit {
  filters = input.required<Array<MCFilter>>();
  result = input.required<MCResultFilter>();
  isFirst = input.required<boolean>();
  config = input<MCAdvancedFilterConfig>();

  clickRemove = output();
  filtersChanged = output<MCResultFilter[]>();

  operators = MCResultFilter.getOperators();
  conditions = MCResultFilter.getConditions();
  operatorWhere = [
    { label: 'Where', value: 'where' },
  ];

  typeText = MCTypeFilter.TEXT;
  typeSelect = MCTypeFilter.SELECT;
  typeAutocomplete = MCTypeFilter.AUTOCOMPLETE;
  typeMultiselect = MCTypeFilter.MULTISELECT;

  filteredOptions: Array<MCItemFilter> = [];
  MCConditionResult = MCConditionResult;

  ngOnInit() {
    // Initialize with saved filters if they exist
    const initialFilters = this.config()?.initialFilters;
    if (initialFilters && initialFilters.length > 0) {
      const currentResult = this.result();
      if (currentResult) {
        currentResult.childrens = [...initialFilters];
        this.emitFiltersChanged();
      }
    }
  }

  clickAddFilter(): void {
    const currentResult = this.result();
    if (currentResult) {
      if (!currentResult.childrens) {
        currentResult.childrens = [];
      }
      currentResult.childrens.push(new MCResultFilter());
      this.emitFiltersChanged();
    }
  }

  clickRemoveFilter(): void {
    this.clickRemove.emit();
    this.emitFiltersChanged();
  }

  onRefreshColumn() {
    const currentResult = this.result();
    if (currentResult) {
      currentResult.value = undefined;

      if(currentResult.filter?.isShowConditions == false){
        currentResult.condition = MCConditionResult.EQUALS;
      }

      if(currentResult.filter?.type == this.typeMultiselect){
        currentResult.condition = MCConditionResult.IN;
        currentResult.value = [];
      }
      
      this.emitFiltersChanged();
    }
  }

  onFilterAutocomplete(event: AutoCompleteCompleteEvent) {
    const currentResult = this.result();
    if (currentResult?.filter?.data?.filter) {
      currentResult.filter.data.filter(event.query)
      .subscribe((data: Array<MCItemFilter>) => {
        this.filteredOptions = data;
      });
    }
  }

  private emitFiltersChanged() {
    const currentResult = this.result();
    if (currentResult?.childrens && currentResult.childrens.length > 0) {
      this.filtersChanged.emit(currentResult.childrens);
    }
  }
}
