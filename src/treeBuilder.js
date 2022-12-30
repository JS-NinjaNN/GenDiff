import _ from 'lodash';

const iter = (value1, value2) => {
  const keys = _.sortBy(_.union(Object.keys(value1), Object.keys(value2)));
  return keys.map((key) => {
    if (_.has(value1, key) && !_.has(value2, key)) {
      return { key, value: value1[key], type: 'deleted' };
    }
    if (!_.has(value1, key) && _.has(value2, key)) {
      return { key, value: value2[key], type: 'added' };
    }
    if (_.isPlainObject(value1[key]) && _.isPlainObject(value2[key])) {
      return { key, children: iter(value1[key], value2[key]), type: 'nested' };
    }
    return (value1[key] === value2[key])
      ? { key, value: value1[key], type: 'unchanged' }
      : {
        key, value1: value1[key], value2: value2[key], type: 'changed',
      };
  });
};

export default (data1, data2) => iter(data1, data2);
