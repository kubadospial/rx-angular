import { chain, Rule } from '@angular-devkit/schematics';
import { Schema as NgAddOptions } from './schema';
import { addPackageJsonDependencies } from '../rules/add-package-json.rule';
import { NodeDependency, NodeDependencyType } from 'schematics-utilities';

const dependencies: NodeDependency[] = [
  {
    type: NodeDependencyType.Default,
    version: '~0.0.0',
    name: '@rx-angular/state'
  }
];

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngAdd(optionsSchema: NgAddOptions): Rule {
  return chain([addPackageJsonDependencies(optionsSchema, dependencies)]);
}
