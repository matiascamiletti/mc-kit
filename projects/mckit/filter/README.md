# @mckit/filter

This library provides a set of components and utilities for handling filters in Angular applications.

## Features

- Filter Button Component with built-in filter storage
- Advanced Filter Panel
- Quick Filter Panel
- Filter to OData Converter
- Automatic Filter State Management with localStorage support

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

### Automatic Filter Storage

The `MCFilterButton` component includes built-in filter storage functionality. Simply provide a `storageKey` to enable automatic filter persistence:

```typescript
@Component({
  selector: 'app-my-component',
  template: `
    <mc-filter-button 
      [config]="filterConfig" 
      storageKey="my-page-filters"
      (change)="onFilter($event)">
    </mc-filter-button>
  `
})
export class MyComponent {
  filterConfig = new MCConfigFilter();
  
  onFilter(filters: Array<MCResultFilter>) {
    // Handle filter changes
    // Filters are automatically saved to localStorage
  }
}
```

When a `storageKey` is provided:
- Filters are automatically saved to localStorage when they change
- Filters are automatically loaded from localStorage when the component initializes
- Each instance of `MCFilterButton` maintains its own independent filter state
- No additional code is needed to manage filter persistence

## Filter State Management

### Complete Example

Here's a complete example of how to use the filter components with automatic storage:

```typescript
import { Component, OnInit } from '@angular/core';
import { 
  MCConfigFilter, 
  MCFilter, 
  MCResultFilter,
  MCFilterButton
} from '@mckit/filter';

@Component({
  selector: 'app-my-page',
  template: `
    <div class="flex gap-2 items-center mb-4">
      <!-- Multiple filter buttons with independent storage -->
      <mc-filter-button 
        [config]="filterConfig" 
        storageKey="my-page-filters"
        (change)="onFilter($event)">
      </mc-filter-button>

      <mc-filter-button 
        [config]="filterConfig2" 
        storageKey="my-page-filters-2"
        (change)="onFilter2($event)">
      </mc-filter-button>
    </div>

    <!-- Table or content that uses the filters -->
    <mc-table 
      [columns]="columns" 
      [response]="tableResponse">
    </mc-table>
  `
})
export class MyPageComponent implements OnInit {
  // Filter configurations
  filterConfig = new MCConfigFilter();
  filterConfig2 = new MCConfigFilter();
  
  ngOnInit() {
    // Configure filters
    this.filterConfig.filters = [
      MCFilter.text({
        title: 'Name',
        key: 'name'
      }),
      // Add more filters...
    ];
  }
  
  onFilter(filters: Array<MCResultFilter>) {
    // Handle filter changes for first filter button
    // Filters are automatically saved
  }

  onFilter2(filters: Array<MCResultFilter>) {
    // Handle filter changes for second filter button
    // Filters are automatically saved independently
  }
}
```

## Additional Notes

- Each `MCFilterButton` instance maintains its own independent filter state
- Filter storage uses localStorage with unique keys for each instance
- All original filter properties and types are preserved when filters are saved and loaded
- The library supports multiple filters with the same key and type, allowing for OR/AND operations
- Filter groups (nested filters) are fully supported with proper reconstruction

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
