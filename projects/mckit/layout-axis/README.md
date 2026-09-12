# @mckit/layout-axis

Axis layout for MC Kit: a dark navigation sidebar, a white topbar with **left / center / right** slots and a light content area. Built for Angular 21, PrimeNG 21 and Tailwind CSS v4.

It follows the same structure as `MCFuseLayoutComponent`, so everything you already register through `MCSidebarService`, `MCTopbarService` and `MCFooterService` (menus, logos, tenant switcher, avatar, dark mode button...) keeps working without changes.

## Installation

```bash
npm install @mckit/core @mckit/layout-core @mckit/layout-axis
```

Tailwind CSS v4 needs to scan the library so its utility classes are generated. Add to your `styles.scss`:

```scss
@use "tailwindcss";
@source "../node_modules/@mckit/layout-axis";

@custom-variant dark (&:where(.dark, .dark *));
```

## Usage

Use `MCAxisLayoutComponent` as the parent route of your pages:

```ts
import { Routes } from '@angular/router';
import { MCAxisLayoutComponent } from '@mckit/layout-axis';

export const routes: Routes = [
  {
    path: '',
    component: MCAxisLayoutComponent,
    children: [
      { path: '', component: DashboardPage },
      { path: 'opportunities', component: OpportunitiesPage },
    ],
  },
];
```

Then fill the slots from your root component, exactly as with the Fuse layout:

```ts
import { MCAvatar, MCImage, MCMenu, MCSubtitle } from '@mckit/core';
import { MCIconToggleSidebarButton } from '@mckit/layout';
import { MCFooterService, MCSidebarService, MCTopbarService } from '@mckit/layout-core';

export class AppComponent implements OnInit {
  sidebarService = inject(MCSidebarService);
  topbarService = inject(MCTopbarService);
  footerService = inject(MCFooterService);

  ngOnInit(): void {
    this.sidebarService.setComponents([
      new MCImage('assets/logo-white.svg', 150),
      new MCSubtitle('Programa'),
      new MCMenu([
        { label: 'Resumen', link: '/', icon: 'pi pi-th-large' },
        { label: 'Oportunidades', link: '/opportunities', icon: 'pi pi-lightbulb' },
      ]),
    ]);

    this.topbarService.addComponentToLeft(new MCIconToggleSidebarButton());
    this.topbarService.addComponentToCenter(new StageSelector());
    this.topbarService.addComponentToRight(new MCAvatar({ label: 'AM', shape: 'circle' }));

    this.footerService.addComponent(new MCSubtitle('© 2026'));
  }
}
```

### Slots

| Slot          | Service method                           | Notes                                              |
| :------------ | :--------------------------------------- | :------------------------------------------------- |
| Sidebar       | `MCSidebarService.setComponents()`       | Dark surface. Stock `MCMenu` / `MCSubtitle` are re-skinned automatically. |
| Topbar left   | `MCTopbarService.addComponentToLeft()`   | Usually the sidebar toggle and the app title.      |
| Topbar center | `MCTopbarService.addComponentToCenter()` | Hidden below the `md` breakpoint.                  |
| Topbar right  | `MCTopbarService.addComponentToRight()`  | Actions, notifications, avatar.                    |
| Footer        | `MCFooterService.addComponent()`         | Rendered below the routed page.                    |

### Behaviour

- The sidebar state lives in `MCSidebarService.isOpen`, so `MCIconToggleSidebarButton` (or any custom button) toggles it.
- Below `768px` the sidebar becomes an overlay drawer with a backdrop and a close button, and starts closed.
- A progress spinner overlays the content while a route is being resolved (`NavigationStart` → `NavigationEnd | NavigationCancel | NavigationError`).
- Dark mode follows the `.dark` class on an ancestor (PrimeNG `darkModeSelector: '.dark'`). The sidebar is always dark.

## Theming

Every color and dimension is a CSS custom property set on the `mc-axis-layout` host, so you can override them from a global stylesheet:

```scss
mc-axis-layout {
  --mc-axis-sidebar-bg: #111827;
  --mc-axis-sidebar-width: 18rem;
  --mc-axis-layout-bg: #fafafa;
}
```

| Variable                        | Default                     | Description                              |
| :------------------------------ | :-------------------------- | :--------------------------------------- |
| `--mc-axis-sidebar-width`       | `17rem`                     | Sidebar width on desktop.                |
| `--mc-axis-topbar-height`       | `4rem`                      | Topbar height.                           |
| `--mc-axis-content-max-width`   | `96rem`                     | Max width of the routed content.         |
| `--mc-axis-transition`          | `0.3s ease`                 | Sidebar open / close transition.         |
| `--mc-axis-layout-bg`           | `#f5f6f8`                   | Content background (light mode).         |
| `--mc-axis-layout-bg-dark`      | `#0b1220`                   | Content background (dark mode).          |
| `--mc-axis-topbar-bg`           | `#ffffff`                   | Topbar background (light mode).          |
| `--mc-axis-topbar-bg-dark`      | `#111a2b`                   | Topbar background (dark mode).           |
| `--mc-axis-border-color`        | `#e6e8ee`                   | Topbar border (light mode).              |
| `--mc-axis-border-color-dark`   | `#1f2a3d`                   | Topbar border (dark mode).               |
| `--mc-axis-sidebar-bg`          | `#0f1b2d`                   | Sidebar background.                      |
| `--mc-axis-sidebar-text`        | `#e8ecf4`                   | Sidebar text and icons (active / hover). |
| `--mc-axis-sidebar-muted`       | `#8a95aa`                   | Section titles and idle icons.           |
| `--mc-axis-sidebar-border`      | `rgba(255, 255, 255, 0.08)` | Sidebar right border.                    |
| `--mc-axis-sidebar-hover-bg`    | `rgba(255, 255, 255, 0.06)` | Menu item hover background.              |
| `--mc-axis-sidebar-active-bg`   | `rgba(255, 255, 255, 0.12)` | Active menu item background.             |
| `--mc-axis-sidebar-scrollbar`   | `rgba(255, 255, 255, 0.15)` | Sidebar scrollbar thumb.                 |

Structural classes are shared with the Fuse layout (`layout-wrapper`, `layout-sidebar`, `layout-topbar`, `layout-main`, `layout-footer`) and prefixed ones are available for Axis-specific overrides (`mc-axis-sidebar`, `mc-axis-topbar`, `mc-axis-content`...).

## Development

```bash
ng build @mckit/layout-axis          # build to dist/mckit/layout-axis
ng test @mckit/layout-axis           # vitest unit tests
npm run publish-layout-axis          # build + publish to npm
```

The playground app serves this layout at [http://localhost:4200/axis](http://localhost:4200/axis) (`npm start`).
