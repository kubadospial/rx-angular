import { StartRxIf01Component } from './start.rx-if01.component';
import { SolutionRxIf01Component } from './solution-rx-if01.component';

export const ROUTES = [
  {
    path: '',
    children: [
      {
        path: '',
        component: StartRxIf01Component
      },
      {
        path: 'solution',
        component: SolutionRxIf01Component
      }
    ]
  }
];
