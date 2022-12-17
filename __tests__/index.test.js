/* eslint-disable import/extensions */
import { test, expect, describe } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../src/index.js';
import expectedDiff from '../__fixtures__/expected_diff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('gendiff generate correct diff', () => {
  test('gendiff nested json should work', () => {
    const actual = gendiff(getFixturePath('nested1.json'), getFixturePath('nested2.json'));
    const expected = expectedDiff();
    expect(actual).toEqual(expected);
  });

  test('gendiff plain yaml should work', () => {
    const actual = gendiff(getFixturePath('nested1.yaml'), getFixturePath('nested2.yaml'));
    const expected = expectedDiff();
    expect(actual).toEqual(expected);
  });

  test('gendiff plain yml should work', () => {
    const actual = gendiff(getFixturePath('nested1.yml'), getFixturePath('nested2.yml'));
    const expected = expectedDiff();
    expect(actual).toEqual(expected);
  });
});
