import { Routes } from '@angular/router';
import { BasicLayout } from '../../../mckit/layout/src/lib/layouts/basic-layout/basic-layout.component';
import { TestPageComponent } from './pages/test-page/test-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'basic', pathMatch: 'full' },
  {
    path: 'basic',
    component: BasicLayout,
    children: [
      {
        path: '',
        component: TestPageComponent,
        title: 'Test page'
      },
    ]
  },
];
