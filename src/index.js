/* eslint-disable import/extensions */
/* eslint-disable no-console */
import _ from 'lodash';
import parseFile from './parsers.js';

export default (filepath1, filepath2) => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  const iter = (value1, value2) => {
    const keys = _.union(Object.keys(value1), Object.keys(value2));
    const diff = keys.flatMap((currentKey) => {
      console.log(currentKey);
      let result;
      if (_.has(value1, currentKey) && _.has(value2, currentKey)) {
        if (!_.isObject(value1[currentKey]) && !_.isObject(value2[currentKey])) {
          if (value1[currentKey] === value2[currentKey]) {
            result = { key: currentKey, value: value1[currentKey], type: 'unchanged' };
          } else {
            result = {
              key: currentKey, value1: value1[currentKey], value2: value2[currentKey], type: 'changed',
            };
          }
        } else if (_.isObject(value1[currentKey]) && _.isObject(value2[currentKey])) {
          result = { key: currentKey, children: [iter(value1[currentKey], value2[currentKey])], type: 'nested' };
        } else if (_.isObject(value1[currentKey]) && !_.isObject(value2[currentKey])) {

        } else {

        }
      } else if (_.has(value1, currentKey) && !_.has(value2, currentKey)) {
        if (!_.isObject(value1[currentKey])) {
          result = { key: currentKey, value: value1[currentKey], type: 'deleted' };
        } else {
          result = value1[currentKey];
        }
      } else if (!_.has(value1, currentKey) && _.has(value2, currentKey)) {
        if (!_.isObject(value2[currentKey])) {
          result = { key: currentKey, value: value2[currentKey], type: 'added' };
        } else {
          result = value2[currentKey];
        }
      }
      return result;
    });
    return diff;
  };
  return iter(data1, data2);
};
