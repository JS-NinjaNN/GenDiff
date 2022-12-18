/* eslint-disable import/extensions */
import { test, expect, describe } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../src/index.js';
import expectedStylish from '../__fixtures__/expected_stylish.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('gendiff should generate correct stylish', () => {
  test('gendiff nested json should work', () => {
    const actual = gendiff(getFixturePath('nested1.json'), getFixturePath('nested2.json'), 'stylish');
    const expected = expectedStylish();
    expect(actual).toEqual(expected);
  });

  test('gendiff nested yaml should work', () => {
    const actual = gendiff(getFixturePath('nested1.yaml'), getFixturePath('nested2.yaml'), 'stylish');
    const expected = expectedStylish();
    expect(actual).toEqual(expected);
  });

  test('gendiff nested yml should work', () => {
    const actual = gendiff(getFixturePath('nested1.yml'), getFixturePath('nested2.yml'), 'stylish');
    const expected = expectedStylish();
    expect(actual).toEqual(expected);
  });
});
