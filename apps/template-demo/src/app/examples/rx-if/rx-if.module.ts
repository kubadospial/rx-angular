import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RxIfContainerComponent } from './rx-if.container.component';
import { TemplateModule } from '@rx-angular/template';
import { ROUTES } from './rx-if.routes';

const DECLARATIONS = [RxIfContainerComponent];
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
export class RxIfModule {}
