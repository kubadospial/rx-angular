import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject } from 'rxjs';
import { scan } from 'rxjs/operators';

@Component({
  selector: 'rx-if-01',
  template: `
    <button (click)="isVisibleSubject.next()">Toggle</button>
    i$: {{ isVisible$ | push }}
    <ng-container *rxLet="isVisible$; let i">
      {{ i }}
    </ng-container>
    <ng-container *rxIf="isVisible$; let i">
      {{ i }}
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SolutionRxIf01Component {
  isVisibleSubject = new Subject<boolean>();
  isVisible$ = this.isVisibleSubject.pipe(scan(b => !b));
}
