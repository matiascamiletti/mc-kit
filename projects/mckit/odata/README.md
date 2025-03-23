# MC Odata Library

## Generar desde Schematics

ng g @mckit/schematics:add-table --name Person --component src/app/features/person/pages/PersonListPage

Donde --name es la clase/entidad/modelo
y --component es la ruta y nombre del componente

## Components

### MCOdataTableComponent

This abstract component provides a base for creating tables that interact with OData services. It includes functionalities for pagination, sorting, filtering, and searching.

### MCOdataSignalTableComponent

Similar to `MCOdataTableComponent`, but uses Angular signals for state management.

### OdataMultiselectComponent

A multi-select component that interacts with OData services. It supports searching and selecting multiple items.

## Entities

### MCOdata

Represents the OData query parameters such as top, skip, orderBy, filters, and expands. It includes methods for setting pagination and converting the parameters to a query string.

### MCFilterProcessor

Handles the conversion of table filters to OData filter strings. It supports various filter operations like equals, notEquals, startsWith, contains, and endsWith.
