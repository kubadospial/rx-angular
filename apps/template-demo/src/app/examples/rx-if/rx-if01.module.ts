import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RxIfComponent } from './01/rx-if.component';
import { RxIfContainerComponent } from './rx-if.container.component';
import { TemplateModule } from '@rx-angular/template';

export const ROUTES = [
  {
    path: '',
    pathMatch: 'full',
    component: RxIfContainerComponent
  },
  {
    path: 'solution',
    component: RxIfContainerComponent
  }
];
const DECLARATIONS = [RxIfComponent, RxIfContainerComponent];
export const materialModules = [];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    materialModules,
    RouterModule.forChild(ROUTES),
    TemplateModule
  ],
  exports: [DECLARATIONS]
})
export class RxIf01Module {}
