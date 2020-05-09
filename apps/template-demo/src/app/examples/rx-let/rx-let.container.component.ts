import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MENU_ITEMS } from './rx-let.menu';

@Component({
  selector: 'rx-let-container',
  template: `
    <h1>RxLet</h1>
    <a mat-button *ngFor="let item of items" [routerLink]="[item.link]">
      {{ item.label }}
    </a>
    <br />
    <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RxLetContainerComponent {
  items = MENU_ITEMS;
}
