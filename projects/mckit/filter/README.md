# @mckit/filter

This library provides a set of components and utilities for handling filters in Angular applications.

## Features

- Filter Button Component
- Advanced Filter Panel
- Quick Filter Panel
- Filter to OData Converter
- Filter State Management with localStorage support

## Components

### Filter Button

```typescript
import { MCFilterButton } from '@mckit/filter';

@Component({
  selector: 'app-my-component',
  template: `
    <mc-filter-button [config]="filterConfig" (change)="onFilter($event)"></mc-filter-button>
  `
})
export class MyComponent {
  filterConfig = new MCConfigFilter();
  
  onFilter(filters: Array<MCResultFilter>) {
    // Handle filter changes
  }
}
```

## Filter State Management

### Complete Example

Here's a complete example of how to use the FilterStore with the filter components:

```typescript
import { Component, OnInit } from '@angular/core';
import { 
  MCConfigFilter, 
  MCFilter, 
  MCResultFilter, 
  FilterStore,
  MCFilterButton
} from '@mckit/filter';

@Component({
  selector: 'app-my-page',
  template: `
    <div class="flex gap-2 items-center mb-4">
      <!-- Filter component -->
      <mc-filter-button 
        [config]="filterConfig" 
        (change)="onFilter($event)">
      </mc-filter-button>

      <!-- Clear filters button -->
      <p-button 
        label="Clear filters" 
        icon="pi pi-trash" 
        severity="danger" 
        (onClick)="clearFilters()">
      </p-button>
    </div>

    <!-- Table or content that uses the filters -->
    <mc-table 
      [columns]="columns" 
      [response]="tableResponse">
    </mc-table>
  `
})
export class MyPageComponent implements OnInit {
  // Inject the store
  filterStore = inject(FilterStore);
  
  // Filter configuration
  filterConfig = new MCConfigFilter();

  constructor() {
    // Set a unique key for this component
    this.filterStore.setStorageKey('my-page-filters');
  }

  ngOnInit() {
    // Configure available filters
    this.filterConfig.filters = [
      // Simple text filter
      MCFilter.text({
        title: 'Name',
        key: 'name'
      }),

      // Quick select filter
      MCFilter.selectQuickFilter({
        title: 'Status',
        key: 'status',
        options: [
          { label: 'Active', value: 'active' },
          { label: 'Inactive', value: 'inactive' },
          { label: 'Pending', value: 'pending' }
        ],
        placeholder: 'Select status'
      }),

      // Autocomplete filter
      MCFilter.autocomplete({
        title: 'City',
        key: 'city',
        filter: this.onCitySearch.bind(this),
        placeholder: 'Search city',
      }),

      // Multi-select filter
      MCFilter.multiselect({
        title: 'Categories',
        key: 'categories',
        options: [
          { label: 'Sports', value: 'sports' },
          { label: 'Music', value: 'music' },
          { label: 'Art', value: 'art' }
        ],
        placeholder: 'Select categories',
      })
    ];

    // Load saved filters
    this.loadSavedFilters();
  }

  loadSavedFilters() {
    // Load filters from localStorage
    this.filterStore.loadFilters(this.filterConfig.filters);
    
    // If there are saved filters, apply them
    if (this.filterStore.hasFilters()) {
      this.filterConfig.initialFilters = this.filterStore.filters();
      // Apply filters to table/data
      this.applyFilters(this.filterStore.filters());
    }
  }

  onFilter(filters: Array<MCResultFilter>) {
    // Save new filters
    this.filterStore.saveFilters(filters);
    // Apply filters
    this.applyFilters(filters);
  }

  clearFilters() {
    // Clear filters from store and localStorage
    this.filterStore.clearFilters();
    // Clear filters from config
    this.filterConfig.initialFilters = [];
    // Reload data without filters
    this.loadData();
  }

  // Example search function for autocomplete
  onCitySearch(query: string): Observable<Array<MCItemFilter>> {
    return this.cityService.search(query).pipe(
      map(cities => cities.map(city => ({
        label: city.name,
        value: city.id
      })))
    );
  }

  private applyFilters(filters: Array<MCResultFilter>) {
    // Convert filters to OData format if needed
    const odataFilter = this.odataConverter.convert(filters);
    // Load data with filters
    this.loadData(odataFilter);
  }

  private loadData(filters?: string) {
    this.myService.getData(filters).subscribe(response => {
      this.tableResponse = response;
    });
  }
}
```

### Key Features of FilterStore

- **Automatic State Management**: Uses Angular signals for reactive state management
- **localStorage Persistence**: Automatically saves and loads filters
- **SSR Compatible**: Safe to use with Server-Side Rendering
- **Filter Reconstruction**: Properly reconstructs complex filter structures
- **Error Handling**: Built-in error handling for storage operations
- **No External Dependencies**: Uses only Angular built-in features

### Basic Usage

```typescript
import { FilterStore } from '@mckit/filter';

@Component({...})
export class MyComponent {
  filterStore = inject(FilterStore);
  
  ngOnInit() {
    // Set unique storage key
    this.filterStore.setStorageKey('my-filters');
    
    // Load saved filters
    this.filterStore.loadFilters(configFilters);
    
    // Check if there are filters
    if (this.filterStore.hasFilters()) {
      // Get current filters
      const filters = this.filterStore.filters();
    }
  }
  
  // Save new filters
  saveFilters(filters: MCResultFilter[]) {
    this.filterStore.saveFilters(filters);
  }
  
  // Clear all filters
  clearFilters() {
    this.filterStore.clearFilters();
  }
}
```

## Configuration

### Filter Types

The library supports various filter types:

```typescript
MCFilter.text({ title: 'Name', key: 'name' });
MCFilter.select({ title: 'Status', key: 'status', options: [...] });
MCFilter.multiselect({ title: 'Categories', key: 'categories', options: [...] });
MCFilter.autocomplete({ title: 'Search', key: 'search', filter: searchFn });
```

### Filter Configuration

```typescript
const filterConfig = new MCConfigFilter();
filterConfig.filters = [
  MCFilter.text({ title: 'Name', key: 'name' }),
  MCFilter.select({ title: 'Status', key: 'status', options: [...] })
];
```

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b feature/my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/my-new-feature`)
5. Create new Pull Request
