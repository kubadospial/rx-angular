import { RxLetContainerComponent } from './rx-let.container.component';

export const ROUTES = [
  {
    path: '',
    component: RxLetContainerComponent,
    children: [
      {
        path: 'rx-let-01',
        loadChildren: () =>
          import('./01/rx-let-01.module').then(m => m.RxLet01Module)
      }
    ]
  }
];
