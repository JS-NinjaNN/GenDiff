/* eslint-disable import/extensions */
import { readFileSync } from 'fs';
import { cwd } from 'process';
import path from 'path';
import parseFile from './parsers.js';
import format from './formatters/index.js';
import buildTree from './treeBuilder.js';

const readFile = (filepath) => {
  const fullPath = path.resolve(cwd(), filepath);
  const data = readFileSync(fullPath, 'utf-8');
  return data;
};

const getFormat = (filepath) => {
  switch (path.extname(filepath)) {
    case '.json':
      return 'json';
    case '.yaml':
      return 'yaml';
    case '.yml':
      return 'yml';
    default:
      throw new Error('The file name must be entered with the extension!');
  }
};

export default (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parseFile(readFile(filepath1), getFormat(filepath1));
  const data2 = parseFile(readFile(filepath2), getFormat(filepath2));
  const diff = buildTree(data1, data2);
  return format(diff, formatName);
};
