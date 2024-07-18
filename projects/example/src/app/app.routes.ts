import { Routes } from '@angular/router';
import { TestPageComponent } from './pages/test-page/test-page.component';
import { BasicLayout } from '../../../mckit/layout/src/public-api';

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
