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

// Define interface for grouped options
interface OptionGroup {
  label: string;
  items: MCItemFilter[];
}

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
  // Store all available options for filtering locally
  availableOptions: MCItemFilter[] = [];
  MCConditionResult = MCConditionResult;

  ngOnInit() {
    // Load initial values for multiselect autocomplete if they exist
    const currentResult = this.result();
    if (currentResult?.filter?.type === MCTypeFilter.MULTISELECT_AUTOCOMPLETE) {
      // If we have selectedOptions from local storage reconstruction, use those
      if (currentResult.selectedOptions && currentResult.selectedOptions.length > 0) {
        this.filteredOptions = [...currentResult.selectedOptions];
        this.availableOptions = [...currentResult.selectedOptions];
      }
      // Otherwise, try to convert values to MCItemFilter format if needed
      else if (currentResult.value && Array.isArray(currentResult.value)) {
        // Convert values back to MCItemFilter format if they're not already
        this.filteredOptions = currentResult.value.map((value: unknown) => {
          if (typeof value === 'object' && value !== null && 'label' in value && 'value' in value) {
            return value as MCItemFilter;
          }
          return { label: String(value), value: value } as MCItemFilter;
        });
        
        // Store the reconstructed options in selectedOptions
        currentResult.selectedOptions = [...this.filteredOptions];
        this.availableOptions = [...this.filteredOptions];
      }
    } else if (currentResult?.filter?.type === MCTypeFilter.MULTISELECT) {
      // Initialize the available options with the filter's options
      if (currentResult.filter?.options) {
        this.availableOptions = [...currentResult.filter.options];
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
      currentResult.selectedOptions = undefined;
      this.filteredOptions = [];
      this.availableOptions = [];

      // For multiselect, initialize availableOptions with filter options
      if (currentResult.filter?.type === MCTypeFilter.MULTISELECT && currentResult.filter?.options) {
        this.availableOptions = [...currentResult.filter.options];
      }

      if(currentResult.filter?.isShowConditions == false){
        currentResult.condition = MCConditionResult.EQUALS;
      }

      if(currentResult.filter?.type == this.typeMultiselect || currentResult.filter?.type == this.typeMultiselectAutocomplete){
        currentResult.condition = MCConditionResult.IN;
        currentResult.value = [];
        if (currentResult.filter?.type == this.typeMultiselectAutocomplete) {
          currentResult.selectedOptions = [];
        }
      }

      this.emitFiltersChanged();
    }
  }

  onFilterAutocomplete(event: AutoCompleteCompleteEvent | MultiSelectFilterEvent) {
    const currentResult = this.result();
    if (!currentResult?.filter) return;

    // For multiselect without autocomplete, we want to do local filtering
    if (currentResult.filter.type === MCTypeFilter.MULTISELECT) {
      if (currentResult.filter?.options) {
        const query = 'query' in event ? event.query : event.filter;
        // No need to do anything, PrimeNG's built-in filter will handle it
        return;
      }
    }
    
    // For multiselect with autocomplete, we need to handle server filtering
    if (currentResult.filter?.type === MCTypeFilter.MULTISELECT_AUTOCOMPLETE && currentResult.filter?.data?.filter) {
      const query = 'query' in event ? event.query : event.filter;
      
      // When the search input is empty, show all available options
      if (!query || query.trim() === '') {
        // Sort alphabetically
        this.filteredOptions = this.sortAlphabetically([...this.availableOptions]);
        return;
      }
      
      currentResult.filter.data.filter(query)
      .subscribe((data: Array<MCItemFilter>) => {
        // Sort new data alphabetically
        const sortedData = this.sortAlphabetically([...data]);
        
        // Add new results to our available options 
        const existingValues = new Set(this.availableOptions.map(opt => opt.value));
        const newOptions = sortedData.filter(opt => !existingValues.has(opt.value));
        
        if (newOptions.length > 0) {
          this.availableOptions = [...this.availableOptions, ...newOptions];
          
          // Sort available options
          this.sortAlphabetically(this.availableOptions);
        }
        
        // Keep selected options along with new search results
        const selectedValues = new Set(currentResult.value || []);
        const selectedOptions = this.availableOptions.filter(opt => selectedValues.has(opt.value));
        
        // Local filtering on the combined set of options
        const filterValue = query.toLowerCase();
        let filteredAvailableOptions = this.availableOptions;
        
        // Only filter if we have a query
        if (query) {
          filteredAvailableOptions = this.availableOptions.filter(option => 
            option.label && option.label.toLowerCase().includes(filterValue)
          );
          
          // Sort filtered options
          this.sortAlphabetically(filteredAvailableOptions);
        }
        
        // Ensure selected options are always present even if they don't match the filter
        const filteredOptionsSet = new Set(filteredAvailableOptions.map(opt => opt.value));
        const missingSelectedOptions = selectedOptions.filter(opt => !filteredOptionsSet.has(opt.value));
        
        // Sort missing selected options
        this.sortAlphabetically(missingSelectedOptions);
        
        // Update filtered options
        this.filteredOptions = [...filteredAvailableOptions, ...missingSelectedOptions];
      });
    } else if (currentResult?.filter?.data?.filter) {
      // Handle standard autocomplete filter
      const query = 'query' in event ? event.query : event.filter;
      currentResult.filter.data.filter(query)
      .subscribe((data: Array<MCItemFilter>) => {
        // Sort data alphabetically
        this.filteredOptions = this.sortAlphabetically([...data]);
      });
    }
  }

  // Method to group options with selected ones at the top
  getGroupedOptions(options: MCItemFilter[] = [], selectedValues: any[] = []): OptionGroup[] {
    if (!options || options.length === 0) {
      return [];
    }

    // Create sets for faster lookups
    const selectedValuesSet = new Set(selectedValues);
    
    // Separate selected and unselected options
    const selectedOptions: MCItemFilter[] = [];
    const unselectedOptions: MCItemFilter[] = [];
    
    options.forEach(option => {
      if (selectedValuesSet.has(option.value)) {
        selectedOptions.push(option);
      } else {
        unselectedOptions.push(option);
      }
    });
    
    // Sort options alphabetically by label
    this.sortAlphabetically(selectedOptions);
    this.sortAlphabetically(unselectedOptions);
    
    // Create the grouped structure
    const result: OptionGroup[] = [];
    
    // Only add the selected group if there are selected options
    if (selectedOptions.length > 0) {
      result.push({
        label: 'Selected',
        items: selectedOptions
      });
    }
    
    // Add the available options
    if (unselectedOptions.length > 0) {
      result.push({
        label: 'Available',
        items: unselectedOptions
      });
    }
    
    return result;
  }

  // Add this method to capture multiselect value changes and update selectedOptions
  onMultiselectChange(event: any) {
    const currentResult = this.result();
    if (currentResult && currentResult.filter?.type === MCTypeFilter.MULTISELECT_AUTOCOMPLETE) {
      // Get the selected values
      const selectedValues = event.value;
      
      // Find the corresponding complete options with labels from availableOptions
      const selectedCompleteOptions = selectedValues.map((val: any) => {
        const option = this.availableOptions.find(opt => opt.value === val);
        return option || { label: String(val), value: val };
      });
      
      // Update the selectedOptions in the result
      currentResult.selectedOptions = selectedCompleteOptions;
      
      // Make sure that selected options are always in the filtered options list
      if (selectedCompleteOptions.length > 0) {
        const existingValues = new Set(this.availableOptions.map(opt => opt.value));
        const newSelectedOptions = selectedCompleteOptions.filter((opt: MCItemFilter) => !existingValues.has(opt.value));
        
        if (newSelectedOptions.length > 0) {
          this.availableOptions = [...this.availableOptions, ...newSelectedOptions];
          this.filteredOptions = [...this.filteredOptions, ...newSelectedOptions];
          
          // Sort the options
          this.sortAlphabetically(this.availableOptions);
          this.sortAlphabetically(this.filteredOptions);
        }
      }
      
      this.emitFiltersChanged();
    }
  }

  // Method to handle dropdown being shown
  onShowDropdown() {
    const currentResult = this.result();
    if (currentResult?.filter?.type === MCTypeFilter.MULTISELECT_AUTOCOMPLETE) {
      // When the dropdown is shown, display all available options - sorted alphabetically
      this.filteredOptions = this.sortAlphabetically([...this.availableOptions]);
    }
  }

  // Helper method to sort options alphabetically by label
  private sortAlphabetically(options: MCItemFilter[]): MCItemFilter[] {
    return options.sort((a, b) => {
      const labelA = a.label?.toLowerCase() || '';
      const labelB = b.label?.toLowerCase() || '';
      return labelA.localeCompare(labelB);
    });
  }

  private emitFiltersChanged() {
    const currentResult = this.result();
    if (currentResult?.childrens && currentResult.childrens.length > 0) {
      this.filtersChanged.emit(currentResult.childrens);
    }
  }
}
