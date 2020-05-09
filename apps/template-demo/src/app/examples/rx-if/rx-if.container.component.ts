import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'rx-if-container',
  template: `
    <h1>Solution</h1>
    <rxIf> </rxIf>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RxIfContainerComponent {
  refreshIntervalInput$ = new Subject<Event>();
  refreshInterval$ = this.refreshIntervalInput$.pipe(
    map((e: any) => e.target.value)
  );

  numRenders = 0;
  rerenders(): number {
    return ++this.numRenders;
  }
}
