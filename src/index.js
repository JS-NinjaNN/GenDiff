/* eslint-disable import/extensions */
/* eslint-disable no-console */
import _ from 'lodash';
import parseFile from './parsers.js';
import chooseFormat from './formatters/index.js';

export default (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  const iter = (value1, value2) => {
    const uniqKeys = _.union(Object.keys(value1), Object.keys(value2));
    const sorted = [...uniqKeys].sort();
    const diff = sorted.map((currentKey) => {
      if (_.has(value1, currentKey) && _.has(value2, currentKey)) {
        if (!_.isPlainObject(value1[currentKey]) && !_.isPlainObject(value2[currentKey])) {
          return (value1[currentKey] === value2[currentKey])
            ? { key: currentKey, value: value1[currentKey], type: 'unchanged' }
            : {
              key: currentKey, value1: value1[currentKey], value2: value2[currentKey], type: 'changed',
            };
        }
        if (_.isPlainObject(value1[currentKey]) && _.isPlainObject(value2[currentKey])) {
          return { key: currentKey, children: iter(value1[currentKey], value2[currentKey]), type: 'nested' };
        }
        if (_.isPlainObject(value1[currentKey]) && !_.isPlainObject(value2[currentKey])) {
          return {
            key: currentKey, value1: value1[currentKey], value2: value2[currentKey], type: 'changed',
          };
        }
        if (!_.isPlainObject(value1[currentKey]) && _.isPlainObject(value2[currentKey])) {
          return {
            key: currentKey, value1: value1[currentKey], value2: value2[currentKey], type: 'changed',
          };
        }
      }
      return (_.has(value1, currentKey) && !_.has(value2, currentKey))
        ? { key: currentKey, value: value1[currentKey], type: 'deleted' }
        : { key: currentKey, value: value2[currentKey], type: 'added' };
    });
    return diff;
  };
  return chooseFormat(iter(data1, data2), formatName);
};
