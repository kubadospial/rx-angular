# CLI Scripts

## Description

In this section we organize all scripts needed for development.
Every script has it's related markdown file with detailed notes on the usage.

## Usage

To run a script directly use following command:
`ts-node ./tools/scripts/script-name.ts`

You can also specify which `tsconfig.json` file should be used over the `-P` param.
In our case we always use the `tsconfig.json` file placed in the `tools` folder.

The command looks like that:
`ts-node -P ./tools/tsconfig.tools.json -r ./tools/scripts/script-name.ts"`

Normally all relevant scripts are linked in the `package.json` file under `scripts`.

```json
{
    ...
    "scripts": {
      "script-name":  "ts-node -P ./tools/tsconfig.tools.json -r ./tools/scripts/script-name.ts"
    }
}
```

## Params

All tasks accept arguments of the command line and can be called from the command line or from npm scripts:  
`ts-node task-name.ts one two=three four`

or with specified tsconfig like this:
`ts-node -P .\tools\tsconfig.tools.json -r ./tools/scripts/script-name.ts one two=three four`
