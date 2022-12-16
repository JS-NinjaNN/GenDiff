/* eslint-disable import/extensions */
import { test, expect, describe } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../src/index.js';
import expectedPlain from '../__fixtures__/expectedPlain.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('gendiff tests', () => {
  test('gendiff plain json should work', () => {
    const actual = gendiff(getFixturePath('plain1.json'), getFixturePath('plain2.json'));
    const expected = expectedPlain();
    expect(actual).toEqual(expected);
  });

  test('gendiff plain yaml should work', () => {
    const actual = gendiff(getFixturePath('plain1.yaml'), getFixturePath('plain2.yaml'));
    const expected = expectedPlain();
    expect(actual).toEqual(expected);
  });

  test('gendiff plain yml should work', () => {
    const actual = gendiff(getFixturePath('plain1.yml'), getFixturePath('plain2.yml'));
    const expected = expectedPlain();
    expect(actual).toEqual(expected);
  });
});
