# 🛠️ MC Kit

> A modern, modular library suite designed to build premium, responsive, and feature-rich applications in **Angular 20** using **PrimeNG 20** and **Tailwind CSS v4**.

MC Kit provides pre-configured layout wrappers, advanced form fields, OData bindings, authentication systems, chat components, multi-tenant helpers, and much more. It's structured as a monorepo containing individual libraries scoped under `@mckit/*`.

---

## 📦 Monorepo Structure & Packages

The workspace is structured around a core library and multiple feature/utility sub-libraries located in `projects/mckit/`:

| Package | Description | Key Dependencies & Peer Dependencies |
| :--- | :--- | :--- |
| **`@mckit/core`** | Core foundations of MC Kit | Base services, utilities, styling hooks, and PrimeUX themes preset helper. |
| **`@mckit/loader`** | Global and local loading indicators | Smooth loaders, spinners, interceptors, and loading overlay components. |
| **`@mckit/auth`** | Full authentication client scaffolding | Login/register layouts (split, Sakai, half-screen), JWT interceptor, route guards, and state services. |
| **`@mckit/filter`** | Query and filter configuration engine | Dynamic builders for filtering tables and API requests. |
| **`@mckit/layout-core`** | Base templates and structural parts | Component contracts, heading components, and layout structures. |
| **`@mckit/layout`** | Basic application layout shells | Sidebars, toggle buttons, customizable topbars, and responsiveness. |
| **`@mckit/layout-sakai`** | Sakai theme structure wrapper | Integrates the Sakai theme as an MC Layout. |
| **`@mckit/layout-fuse`** | Fuse theme structure wrapper | Integrates clean Fuse-style structural shell for layout control. |
| **`@mckit/layout-ai`** | AI/Chat-focused page layout shell | Side-panels, focus structures, and widgets for AI agent workflows. |
| **`@mckit/table`** | Advanced data table with state | Columns toggler, default actions, state persistence, pagination styling. |
| **`@mckit/odata`** | Seamless OData API binding | OData table binding, server-side pagination/filtering/sorting, and multi-select OData helpers. |
| **`@mckit/form`** | Dynamic and reactive form components | Base inputs, validations, helper modules, and custom forms. |
| **`@mckit/monaco-field`** | Monaco Code Editor input control | Embedded Monaco editor with Angular Forms integration. |
| **`@mckit/quill-field`** | Quill Rich-Text Editor input control | Pre-configured WYSIWYG editor for standard HTML text formats. |
| **`@mckit/tenant`** | Multi-tenant context and layout helpers | Switchers, interceptors, and hooks for SaaS environments. |
| **`@mckit/chat`** | Real-time chat elements | Bubbles, list of conversations, input bars, and message templates. |
| **`@mckit/socket`** | Socket.io integration layer | Pre-configured providers, services, and RxJS-friendly socket events. |
| **`@mckit/cron`** | Cron expression builder component | Friendly UI to generate standard crontab configurations. |

---

## 🚀 Getting Started

### Prerequisites

To use or develop in this project, you need:
- **Node.js** 22+
- **Angular CLI** 20+
- **PrimeNG** 20+
- **Tailwind CSS** v4+

### Installation & Setup

1. Clone the repository and install dependencies:
   ```bash
   npm install --force
   ```
2. Start the playground/example application to view live examples:
   ```bash
   npm start
   ```
   Open [http://localhost:4200](http://localhost:4200) in your browser.

---

## 🛠️ Development & Script Commands

Useful workspace commands defined in `package.json`:

### Running & Building
* **Start Playground**: `npm start` (Runs the `example` application).
* **Build a single library**: `ng build @mckit/<project-name>` (e.g. `ng build @mckit/core`).
* **Build all libraries**:
  ```bash
  npm run build-all
  ```
  *(Builds all packages sequentially matching their internal dependencies).*

### Publishing to NPM
The project publishes packages to NPM. Use the following commands (or let CI handle it on merge):
* **Publish core modules package**: `npm run publish-core`
* **Publish layout package**: `npm run publish-layout`
* **Publish OData package**: `npm run publish-odata`
* *(Individual `publish-<package>` scripts are available for all 16+ libraries).*
* **Publish all main packages**: `npm run upload-npm`

---

## 🖥️ Playground / Example Application

The `example` application (`projects/example`) showcases real-life implementations of the modules. You can explore the following layouts and features:
* 🗂️ **Layouts**: Basic (`/basic`), Sakai (`/sakai`), Fuse (`/fuse`), and AI (`/ai`).
* 🔑 **Authentication Screens**: Standard basic (`/login`), screen-split half (`/login-half`), Sakai-styled (`/login-sakai`), and split registration (`/register-split`).
* 📋 **Components & Forms**: Monaco / Quill field integrations, Cron builders, and OData table integration (`/fuse/odata` and `/fuse/table`).
* 💬 **Chat & Socket**: Real-time conversation layouts (`/fuse/conversation`).

---

## 📦 Tailwind CSS & Styling Integration

MC Kit is styled using **Tailwind CSS v4** and **PrimeNG 20** with the **Aura** theme.
Tailwind v4 is configured in `projects/example/src/styles.scss` using the modern `@use` and `@plugin` directives:

```scss
@use "tailwindcss";
@use "primeicons/primeicons.css";
@use 'quill/dist/quill.snow.css';

@plugin "tailwindcss-primeui";

// Tells Tailwind to scan MC Kit libraries for utilities
@source "../../node_modules/@mckit/auth";
@source "../../mckit/auth/src/lib";
@source "../../node_modules/@mckit/tenant";
@source "../../mckit/tenant/src/lib";

@custom-variant dark (&:where(.dark, .dark *));
```

The PrimeNG configuration is bootstrapped inside `projects/example/src/app/app.config.ts`:
```typescript
providePrimeNG({
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.dark',
    },
  },
})
```

---

## 🧪 Testing

To run unit tests via Karma:
```bash
npm run test
```

---

## 🔗 Reference Links & Resources
* [Angular 20 Documentation](https://angular.dev)
* [PrimeNG Components](https://primeng.org)
* [PrimeNG Checkbox](https://primeng.org/checkbox)
* [Apollo PrimeNG Template](https://apollo.primeng.org/)
* [Angular Tutorial: First App](https://v17.angular.io/tutorial/first-app/first-app-lesson-10)
