import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { scan, tap } from 'rxjs/operators';

@Component({
  selector: 'demo-basics',
  template: `
    render{{ render() }}
    <button (click)="toggle$.next($event)">strategy {{ strategy }}</button>

    <div *rxLet="count$; let c; strategy: strategy">
      {{ c }}
    </div>

    <div *rxLet="count$; let c; strategy: strategy">
      {{ c }}
    </div>
    <div *rxLet="count$; let c; strategy: strategy">
      {{ c }}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoBasicsComponent {
  strategy = 'local';
  count$ = interval(1000);
  toggle$ = new Subject();
  click$ = this.toggle$.pipe(
    tap(v => {
      this.strategy = this.strategy === 'ɵlocal' ? 'local' : 'ɵlocal';
    })
  );

  rerenders = 0;
  render = () => ++this.rerenders;

  log = event =>
    console.log(`${event.type} in zone ${(window as any).Zone.current.name}`);

  constructor() {
    this.click$.subscribe();
  }
}
