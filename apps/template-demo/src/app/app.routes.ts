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
      import('./examples/rx-if/rx-if01.module').then(m => m.RxIf01Module)
  }
];
