import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TemplateModule } from '@rx-angular/template';
import { StartRxLet01Component } from './start.rx-let01.component';
import { SolutionRxLet01Component } from './solution-rx-let01.component';
import { ROUTES } from './rx-let-01.routes';

const DECLARATIONS = [SolutionRxLet01Component, StartRxLet01Component];
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
export class RxLet01Module {}
