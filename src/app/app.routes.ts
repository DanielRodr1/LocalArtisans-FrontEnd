import { Routes } from '@angular/router';
import {AdminComponent} from "./components/pages/dynamic/admin/admin.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home-page',
    pathMatch: 'full'
  },
  {
    path: 'home-page',
    loadComponent: () =>
      import('./components/pages/static/home-page/home-page.component').then((c) => c.HomePageComponent),
  },
  {
    path: 'login-register',
    loadComponent: () =>
      import('./components/pages/static/login-register/login-register.component').then((c) => c.LoginRegisterComponent),
  },
  {
    path: 'help',
    loadComponent: () =>
      import('./components/pages/static/help/help.component').then((c) => c.HelpComponent),
  },
  {
    path: 'publication/:productId',
    loadComponent: () =>
      import('./components/pages/dynamic/publication/publication.component').then((c) => c.PublicationComponent)
  },
  {
    path: 'list-product',
    loadComponent: () =>
      import('./components/pages/dynamic/list-products/list-products.component').then((c) => c.ListProductsComponent),
  },
  {
    path: 'publish-product',
    loadComponent: () =>
      import('./components/pages/static/publish-products/publish-products.component').then((c) => c.PublishProductsComponent),
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./components/pages/dynamic/admin/admin.component').then((c) => c.AdminComponent),
  }
];
