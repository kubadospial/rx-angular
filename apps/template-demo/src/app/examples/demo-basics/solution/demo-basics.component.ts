import { ChangeDetectionStrategy, Component } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { scan } from 'rxjs/operators';

@Component({
  selector: 'demo-basics',
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
export class DemoBasicsComponent {
  isVisibleSubject = new Subject<boolean>();
  isVisible$ = this.isVisibleSubject.pipe(scan(b => !b));
}
