#!/usr/bin/env node
/* eslint-disable import/extensions */
import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .version('1.0.0')
  .description('Gendiff is a cli-app that generates the difference between two files and outputs it in one of three formats.\nThe app works with formats json and yaml(yml).\nSupported output formats: stylish, plain and json')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const option = program.opts();
    const diff = genDiff(filepath1, filepath2, option.format);
    console.log(diff);
  });
program.parse();
