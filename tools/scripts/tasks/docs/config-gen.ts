import * as fs from 'fs';
import * as yargs from 'yargs';
import * as inquirer from 'inquirer';
import { BehaviorSubject, Subject } from 'rxjs';
import { startWith, tap } from 'rxjs/operators';

interface DocsGenerationConfig {
  docsUrl: string;
}

getConfig('./crawl.config.local.json');

export async function getConfig(path: string) {
  const staticConfig: DocsGenerationConfig = fs.existsSync(path)
    ? JSON.parse(fs.readFileSync(path).toString())
    : {};

  const configOverride: DocsGenerationConfig = {
    ...staticConfig,
    ...(yargs.argv.gitHubUrl && { gitHubUrl: yargs.argv.gitHubUrl as string }),
    ...(yargs.argv.localePath && {
      localePath: yargs.argv.localePath as string
    }),
    ...(yargs.argv.numGoBack && { numGoBack: yargs.argv.numGoBack as number }),
    ...(yargs.argv.outputFile && {
      outputFile: yargs.argv.outputFile as string
    })
  };



  const questions = [
    {
      type: 'input',
      name: 'sourceDirs',
      message: 'What are the source directories to parse?'
    },
    {
      type: 'input',
      name: 'exclude',
      message: 'What are the excluded directories?'
    },
    {
      type: 'input',
      name: 'outputPath',
      message: 'Where should we save the resulting docs?',
      default: 'generated'
    }
    /*{
      type: "input",
      name: "numGoBack",
      message: "What's the number of versions to go back?",
      validate: function (value: string) {
        const valid = !isNaN(parseFloat(value));
        return valid || "Please enter a number";
      },
      filter: Number,
      default: 3,
    },*/
  ].filter((q) => configOverride[q.name] === undefined);
  const questions$ = new BehaviorSubject(questions[0]);

  questions$.next(
    {
      type: 'input',
      name: 'exclude',
      message: 'What are the excluded directories?'
    }
  )
  return inquirer.prompt(questions$).ui.process.pipe(
    tap(
      (res) => {
        // console.log('RES', res);

      },
      () => {

      },
      () => {

      }
    )
  ).toPromise()



  /*
  return inquirer.prompt(questions).then(async (answers) => {
    const config = { ...configOverride, ...answers } as DocsGenerationConfig;
    fs.writeFileSync(path, JSON.stringify(config));
    return config;
  });
  */
}
