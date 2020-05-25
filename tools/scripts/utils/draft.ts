import * as path from 'path';
import * as klawSync from 'klaw-sync';

export function toHash(title: string): string {
  return title.replace(/\s/g, '').toLowerCase();
}

export function absOutputPath(outputPath: string): string {
  return path.join(__dirname, '../../../apps/docs/', outputPath);
}

export function getSourceFilePaths(
  sourceDirs: string[],
  excludePatterns: RegExp[] = []
): string[] {
  return sourceDirs
    .map(scanPath =>
      klawSync(path.join(__dirname, '../../../', scanPath), {
        nodir: true,
        filter: item => {
          if (path.extname(item.path) === '.ts') {
            for (const pattern of excludePatterns) {
              if (pattern.test(item.path)) {
                return false;
              }
            }
            return true;
          }
          return false;
        },
        traverseAll: true
      })
    )
    .reduce((allFiles, files) => [...allFiles, ...files], [])
    .map(item => item.path);
}
