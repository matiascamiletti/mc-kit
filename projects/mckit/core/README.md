# Core - MC Kit

Core de todo el paquete de librerias de MC Kit, incluye servicios, componentes y herramientas para facilitar el uso.

## Table of Contents

- [Installation](#installation)
  - [1. Install libraries](#1-install-libraries)
  - [2. Add Styles](#2-add-styles)

## Installation

### 1. Install libraries

```bash
npm install --save @mckit/core primeicons primeng primeflex @ngx-pwa/local-storage@18
```

### 2. Add Styles

**File**: ./src/styles.scss

```scss
@import "primeng/resources/themes/lara-light-blue/theme.css";
@import "primeng/resources/primeng.css";
@import "primeicons/primeicons.css";

body, html {
    height: 100%;
    margin: 0;
    min-height: 100%;
}
```

### 3. Add PrimeFlex in Angular.json

```
"node_modules/primeflex/primeflex.css",
```
