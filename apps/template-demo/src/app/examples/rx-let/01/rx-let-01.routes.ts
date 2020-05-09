import { StartRxLet01Component } from './start.rx-let01.component';
import { SolutionRxLet01Component } from './solution-rx-let01.component';

export const ROUTES = [
  {
    path: '',
    children: [
      {
        path: '',
        component: StartRxLet01Component
      },
      {
        path: 'solution',
        component: SolutionRxLet01Component
      }
    ]
  }
];
