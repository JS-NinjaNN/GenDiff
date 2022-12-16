/* eslint-disable import/extensions */
/* eslint-disable no-console */
import _ from 'lodash';
import parseFile from './parsers.js';

export default (filepath1, filepath2) => {
  const obj1 = parseFile(filepath1);
  const obj2 = parseFile(filepath2);
  const uniqKeys = _.uniq(Object.keys(obj1), Object.keys(obj2));

  const diff = uniqKeys.reduce((acc, key) => {
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (obj1[key] === obj2[key]) {
        return [...acc, `    ${key}: ${obj1[key]}`];
      }
      return [...acc, `  - ${key}: ${obj1[key]}`, `  + ${key}: ${obj2[key]}`];
    }
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return [...acc, `  - ${key}: ${obj1[key]}`];
    }
    return [...acc, `  + ${key}: ${obj2[key]}`];
  }, []);
  return ['{', ...diff, '}'].join('\n');
};
