import { Routes } from '@angular/router';

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
    path: 'list-product',
    loadComponent: () =>
      import('./components/pages/dynamic/list-products/list-products.component').then((c) => c.ListProductsComponent),
  },
  {
    path: 'publish-product',
    loadComponent: () =>
      import('./components/pages/static/publish-products/publish-products.component').then((c) => c.PublishProductsComponent),
  }
];
