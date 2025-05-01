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
import { MultiSelectModule, MultiSelectFilterEvent } from 'primeng/multiselect';

@Component({
  selector: 'mc-item-advanced-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownModule, InputTextModule, ButtonModule, DropdownModule, AutoCompleteModule, MultiSelectModule],
  templateUrl: './item-advanced-filter.component.html',
  styleUrl: './item-advanced-filter.component.scss'
})
export class ItemAdvancedFilterComponent implements OnInit {
  filters = input.required<Array<MCFilter>>();
  result = input.required<MCResultFilter>();
  isFirst = input.required<boolean>();

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
  typeMultiselectAutocomplete = MCTypeFilter.MULTISELECT_AUTOCOMPLETE;

  filteredOptions: MCItemFilter[] = [];
  MCConditionResult = MCConditionResult;

  ngOnInit() {
    // Load initial values for multiselect autocomplete if they exist
    const currentResult = this.result();
    if (currentResult?.filter?.type === MCTypeFilter.MULTISELECT_AUTOCOMPLETE && 
        currentResult.value && 
        Array.isArray(currentResult.value)) {
      // Convert values back to MCItemFilter format if they're not already
      this.filteredOptions = currentResult.value.map((value: unknown) => {
        if (typeof value === 'object' && value !== null && 'label' in value && 'value' in value) {
          return value as MCItemFilter;
        }
        return { label: String(value), value: value } as MCItemFilter;
      });
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

      if(currentResult.filter?.type == this.typeMultiselect || currentResult.filter?.type == this.typeMultiselectAutocomplete){
        currentResult.condition = MCConditionResult.IN;
        currentResult.value = [];
      }

      this.emitFiltersChanged();
    }
  }

  onFilterAutocomplete(event: AutoCompleteCompleteEvent | MultiSelectFilterEvent) {
    const currentResult = this.result();
    if (currentResult?.filter?.data?.filter) {
      const query = 'query' in event ? event.query : event.filter;
      currentResult.filter.data.filter(query)
      .subscribe((data: Array<MCItemFilter>) => {
        // Merge new options with existing selected options for multiselect autocomplete
        if (currentResult.filter?.type === MCTypeFilter.MULTISELECT_AUTOCOMPLETE) {
          const existingValues = new Set(this.filteredOptions.map(opt => opt.value));
          const newOptions = data.filter(opt => !existingValues.has(opt.value));
          this.filteredOptions = [...this.filteredOptions, ...newOptions];
        } else {
          this.filteredOptions = data;
        }
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
