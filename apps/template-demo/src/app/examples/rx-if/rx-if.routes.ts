import { RxIfContainerComponent } from './rx-if.container.component';

export const ROUTES = [
  {
    path: '',
    component: RxIfContainerComponent,
    children: [
      {
        path: 'rx-if-01',
        loadChildren: () =>
          import('./01/rx-if-01.module').then(m => m.RxIf01Module)
      }
    ]
  }
];
