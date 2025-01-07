# Loader

## Functionality

The Loader library provides a service and components to manage and display loading states in your Angular application.

### Services

#### MCLoaderService

This service is used to control the loading state of the application.

- **isLoading**: A signal that indicates whether the loading state is active.
- **show()**: Sets the loading state to true.
- **hide()**: Sets the loading state to false.

### Resolvers

#### mcLoaderResolver

This resolver hides the loading state when a route is resolved.

### Components

#### MCSpinnerFullScreenComponent

This component displays a full-screen spinner when the loading state is active.

- **isLoading**: Binds to the `isLoading` signal from `MCLoaderService`.

### Usage

1. **Inject the MCLoaderService** in your components or services to control the loading state.

```typescript
import { MCLoaderService } from '@mckit/loader';

constructor(private loaderService: MCLoaderService) {}

someMethod() {
  this.loaderService.show();
  // Perform some action
  this.loaderService.hide();
}
```

2. **Use the MCSpinnerFullScreenComponent** in your templates to display the loading spinner.

```html
<mc-spinner-full-screen></mc-spinner-full-screen>
```