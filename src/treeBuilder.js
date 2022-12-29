import _ from 'lodash';

const iter = (value1, value2) => {
  const diff = _.sortBy(_.union(Object.keys(value1), Object.keys(value2)))
    .map((currentKey) => {
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

export default (data1, data2) => iter(data1, data2);
