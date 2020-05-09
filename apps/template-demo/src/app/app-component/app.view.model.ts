import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { MENU_ITEMS } from '../app.menu';

@Injectable()
export class AppViewModel {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  items = MENU_ITEMS;
  constructor(private breakpointObserver: BreakpointObserver) {}
}
