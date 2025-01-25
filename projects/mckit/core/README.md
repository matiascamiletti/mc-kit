# Core - MC Kit

Core de todo el paquete de librerias de MC Kit, incluye servicios, componentes y herramientas para facilitar el uso.

## Table of Contents

- [Installation](#installation)
  - [1. Install libraries](#1-install-libraries)
  - [2. Add Styles](#2-add-styles)

## Installation

### 1. Install libraries

```bash
npm install --save @mckit/core @primeng/themes primeicons @ngx-pwa/local-storage@19
npm install tailwindcss @tailwindcss/postcss postcss --force
npm i tailwindcss-primeui --save
```

Configure PostCSS Plugins: ".postcssrc.json"
```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

Import Tailwind CSS: "styles.css"

```scss
@import "tailwindcss";
```

Create tailwind.config.js

module.exports = {
    // ...
    plugins: [require('tailwindcss-primeui')]
};


### 2. Add Styles

**File**: ./src/styles.scss

```scss
@import "primeicons/primeicons.css";

/* CSS Layer Configuration for Tailwind and PrimeNG */
@layer tailwind-base, primeng, tailwind-utilities;

/* PrimeNG Layer (no need to modify as the imports handle this) */
@layer primeng {}

/* Components and Utilities Layer for Tailwind */
@layer tailwind-utilities {
    @tailwind components;
    @tailwind utilities;
}

body, html {
    height: 100%;
    margin: 0;
    min-height: 100%;
}
```

### 3. Configure your template paths
Add the paths to all of your template files in your tailwind.config.js file.

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
