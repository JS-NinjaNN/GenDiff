/* eslint-disable import/extensions */
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../src/index.js';
import expected1 from '../__fixtures__/expected1.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('gendiff json should work', () => {
  const actual = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  const expected = expected1();
  expect(actual).toEqual(expected);
});

test('gendiff yaml should work', () => {
  const actual = gendiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'));
  const expected = expected1();
  expect(actual).toEqual(expected);
});

test('gendiff yml should work', () => {
  const actual = gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
  const expected = expected1();
  expect(actual).toEqual(expected);
});
