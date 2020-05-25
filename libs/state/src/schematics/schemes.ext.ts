import * as path from 'path';

const schemas = [
  {
    schemas: [
      path.join('ng-add', 'schema.ext.json'),
      'schema.ext.json',
      'schema.base.json'
    ],
    destination: path.join('ng-add', 'schema.json')
  }
];

module.exports = schemas;
