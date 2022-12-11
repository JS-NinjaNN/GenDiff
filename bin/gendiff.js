#!/usr/bin/env node
/* eslint-disable import/extensions */
import { Command } from 'commander';
import genDiff from '../src/gendiff-logic.js';

const program = new Command();

program
  .name('gendiff')
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => genDiff(filepath1, filepath2));
program.parse();
