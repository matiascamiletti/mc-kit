import { Routes } from '@angular/router';
import { TestPageComponent } from './pages/test-page/test-page.component';
import { BasicLayout } from '../../../mckit/layout/src/public-api';
import { AuthBasicComponent } from './pages/auth-basic/auth-basic.component';
import { AuthHalfComponent } from './pages/auth-half/auth-half.component';
import { AuthSakaiComponent } from './pages/auth-sakai/auth-sakai.component';
import { MCSakaiLayoutComponent } from '../../../mckit/layout-sakai/src/public-api';
import { TestTableComponent } from './pages/test-table/test-table.component';
import { MCFuseLayoutComponent } from '../../../mckit/layout-fuse/src/public-api';
import { RegisterSplitPageComponent } from './pages/register-split-page/register-split-page.component';
import { OdataPageComponent } from './pages/odata-page/odata-page.component';
import { FormPageComponent } from './pages/form-page/form-page.component';
import { PostEditPage } from './pages/post-edit-page/post-edit-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'basic', pathMatch: 'full' },
  {
    path: 'basic',
    component: BasicLayout,
    children: [
      {
        path: '',
        component: TestPageComponent,
        title: 'Test page',
      },
    ],
  },
  {
    path: 'sakai',
    component: MCSakaiLayoutComponent,
    data: {
      styles: {
        layoutBg: '#ffffff',
        topbarBg: '#000000',
        sidebarBg: '#ffffff',
        borderColor: '#e9ecef',
        topbarHeight: '64px',
        shadow: '0 2px 4px rgba(0,0,0,.08)',
      },
    },
    children: [
      {
        path: '',
        component: TestPageComponent,
        title: 'Test page',
      },
      {
        path: 'table',
        component: TestTableComponent,
        title: 'Test Table',
      },
    ],
  },
  {
    path: 'fuse',
    component: MCFuseLayoutComponent,
    children: [
      {
        path: '',
        component: TestPageComponent,
        title: 'Test page',
      },
      {
        path: 'table',
        component: TestTableComponent,
        title: 'Test Table',
      },
      {
        path: 'odata',
        component: OdataPageComponent,
        title: 'Odata Table',
      },
      {
        path: 'form',
        component: FormPageComponent,
        title: 'Form Table',
      },
      {
        path: 'post',
        component: PostEditPage,
        title: 'Post Edit',
      },
    ],
  },
  { path: 'login', component: AuthBasicComponent },
  { path: 'login-half', component: AuthHalfComponent },
  { path: 'login-sakai', component: AuthSakaiComponent },
  { path: 'register-split', component: RegisterSplitPageComponent },
];
