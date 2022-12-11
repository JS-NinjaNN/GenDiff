/* eslint-disable no-console */
import { readFileSync } from 'node:fs';
import _ from 'lodash';
import path from 'node:path';
import { cwd } from 'node:process';

const parseFile = (filepath) => JSON.parse(readFileSync(path.resolve(cwd(), filepath), 'utf-8'));

export default (filepath1, filepath2) => {
  const obj1 = parseFile(filepath1);
  const obj2 = parseFile(filepath2);
  const uniqKeys = _.uniq(Object.keys(obj1), Object.keys(obj2));
  const diff = uniqKeys.reduce((acc, key) => {
    const bothHasKey = Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key);
    const obj1HasKey = Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key);
    const obj2HasKey = !Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key);
    let newAcc;
    if (bothHasKey) {
      if (obj1[key] === obj2[key]) {
        newAcc = `${acc}\n  ${key}: ${obj1[key]}`;
      } else if (obj1[key] !== obj2[key]) {
        newAcc = `${acc}\n- ${key}: ${obj1[key]}\n+ ${key}: ${obj2[key]}`;
      }
    } else if (obj1HasKey) {
      newAcc = `${acc}\n- ${key}: ${obj1[key]}`;
    } else if (obj2HasKey) {
      newAcc = `${acc}\n+ ${key}: ${obj2[key]}`;
    }
    return newAcc;
  }, '');
  console.log(diff);
};
