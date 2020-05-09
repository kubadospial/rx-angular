import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'rx-if',
    pathMatch: 'full'
  },
  {
    path: 'rx-if',
    loadChildren: () =>
      import('./examples/rx-if/rx-if.module').then(m => m.RxIfModule)
  },
  {
    path: 'rx-let',
    loadChildren: () =>
      import('./examples/rx-let/rx-let.module').then(m => m.RxLetModule)
  }
];
