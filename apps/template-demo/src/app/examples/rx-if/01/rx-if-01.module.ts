import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TemplateModule } from '@rx-angular/template';
import { StartRxIf01Component } from './start.rx-if01.component';
import { SolutionRxIf01Component } from './solution-rx-if01.component';
import { ROUTES } from './rx-if-01.routes';

const DECLARATIONS = [SolutionRxIf01Component, StartRxIf01Component];
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
