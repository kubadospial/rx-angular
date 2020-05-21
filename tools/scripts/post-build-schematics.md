# postBuildSchematics

## Description
This script is here to take care about non-compilable files related to a schematic.

It includes following tasks
- copySchematicAssets - copies info and template files to dist
- generateSchemes - merges schemas and extends original into dist

## Usage

To run the script 

```json
{
    ...
    "scripts": {
      "docs:gen":  "ts-node -P ./tools/tsconfig.tools.json -r ./tools/scripts/post-build-schematics.ts"
    }
}
```  
