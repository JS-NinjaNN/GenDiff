/* eslint-disable import/extensions */
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../src/index.js';
import expected1 from '../__fixtures__/expected1.js';
import { jest } from '@jest/globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

beforeEach(() => {
  console.log = jest.fn();
});

test('gendiff json', () => {
  gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  const actual = console.log.mock.calls;
  const expected = expected1();
  expect(actual).toEqual(expected);
});
