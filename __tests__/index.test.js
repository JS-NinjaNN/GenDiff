/* eslint-disable import/extensions */
import { test, expect, describe } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedStylish = readFileSync(getFixturePath('expectedStylish.txt'), 'utf-8');
const expectedPlain = readFileSync(getFixturePath('expectedPlain.txt'), 'utf-8');
const expectedJSON = readFileSync(getFixturePath('expectedJSON.txt'), 'utf-8');
const formats = [
  ['json'],
  ['yaml'],
  ['yml'],
];

describe('genDiff should work correctly', () => {
  test.each(formats)('genDiff should work with %p', (format) => {
    const filepath1 = getFixturePath(`nested1.${format}`);
    const filepath2 = getFixturePath(`nested2.${format}`);
    expect(genDiff(filepath1, filepath2)).toEqual(expectedStylish);
    expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(expectedStylish);
    expect(genDiff(filepath1, filepath2, 'plain')).toEqual(expectedPlain);
    expect(genDiff(filepath1, filepath2, 'json')).toEqual(expectedJSON);
  });
});
