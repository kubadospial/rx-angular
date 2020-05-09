import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RxLetContainerComponent } from './rx-let.container.component';
import { TemplateModule } from '@rx-angular/template';
import { ROUTES } from './rx-let.routes';

const DECLARATIONS = [RxLetContainerComponent];
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
export class RxLetModule {}
