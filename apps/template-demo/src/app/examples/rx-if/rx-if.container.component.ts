import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MENU_ITEMS } from './rx-if.menu';

@Component({
  selector: 'rx-if-container',
  template: `
    <h1>RrxIf</h1>
    <a mat-button *ngFor="let item of items" [routerLink]="[item.link]">
      {{ item.label }}
    </a>
    <br />
    <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RxIfContainerComponent {
  items = MENU_ITEMS;
}
