import { TypeMap } from './utils/typescript-docgen-types';
import { deleteGeneratedDocs } from './utils/docgen-utils';
import { absOutputPath, getSourceFilePaths, toHash } from '../../utils/draft';
import { TypescriptDocsParser } from './utils/typescript-docs-parser';
import { TypescriptDocsRenderer } from './utils/typescript-docs-renderer';

export interface DocsSectionConfig {
  sourceDirs: string[];
  exclude?: RegExp[];
  outputPath: string;
}


/**
 * Uses the TypeScript compiler API to parse the given files and extract out the documentation
 * into markdown files
 */
export function generateTypescriptDocs(
  config: DocsSectionConfig[],
  isWatchMode: boolean = false
) {
  const timeStart = +new Date();

  // This map is used to cache types and their corresponding Hugo path. It is used to enable
  // hyperlinking from a member's "type" to the definition of that type.
  const globalTypeMap: TypeMap = new Map();

  if (!isWatchMode) {
    for (const { outputPath, sourceDirs } of config) {
      deleteGeneratedDocs(absOutputPath(outputPath));
    }
  }

  for (const { outputPath, sourceDirs, exclude } of config) {
    const sourceFilePaths = getSourceFilePaths(sourceDirs, exclude);
    const docsPages = new TypescriptDocsParser().parse(sourceFilePaths);
    for (const page of docsPages) {
      const { category, fileName, declarations } = page;
      for (const declaration of declarations) {
        const pathToTypeDoc = `${outputPath}/${category ? category + '/' : ''}${
          fileName === '_index' ? '' : fileName
        }#${toHash(declaration.title)}`;
        globalTypeMap.set(declaration.title, pathToTypeDoc);
      }
    }
    const docsUrl = `/docs`;
    const generatedCount = new TypescriptDocsRenderer().render(
      docsPages,
      docsUrl,
      absOutputPath(outputPath),
      globalTypeMap
    );

    if (generatedCount) {
      console.log(
        `Generated ${generatedCount} typescript api docs for "${outputPath}" in ${+new Date() -
          timeStart}ms`
      );
    }
  }
}
