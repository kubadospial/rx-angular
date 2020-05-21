interface DocsSectionConfig {
  sourceDirs: string[];
  exclude?: RegExp[];
  outputPath: string;
}

const sections: DocsSectionConfig[] = [
  {
    sourceDirs: ['libs/state/src/'],
    exclude: [],
    outputPath: 'generated'
  }
];
