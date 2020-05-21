import * as fs from 'fs-extra';
import { extname } from 'path';
import { generateTypescriptDocs } from './tasks/docs/generate-docs';

/**
 * THX TO @michaelbromley
 * copied from here: https://github.com/vendure-ecommerce/vendure/blob/8592e9d80427f08ff7454cd9106c07f15aa765d0/scripts/docs/generate-typescript-docs.ts#L1
 */

generateTypescriptDocs(sections);

const watchMode = !!process.argv.find(arg => arg === '--watch' || arg === '-w');
if (watchMode) {
  console.log(`Watching for changes to source files...`);
  sections.forEach(section => {
    section.sourceDirs.forEach(dir => {
      fs.watch(dir, { recursive: true }, (eventType, file) => {
        if (extname(file) === '.ts') {
          console.log(`Changes detected in ${dir}`);
          generateTypescriptDocs([section], true);
        }
      });
    });
  });
}
