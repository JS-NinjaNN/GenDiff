/* eslint-disable import/extensions */
import _ from 'lodash';
import { getType, getValue, getKey } from './utils.js';

const modifyValue = (value) => ((typeof value === 'string') ? `'${value}'` : `${value}`);

export default (diff) => {
  const iter = (tree, path, prevNodeType) => {
    const result = tree.map((node) => {
      const newPath = (prevNodeType === 'nested')
        ? [...path, getKey(node)]
        : [];
      if (getType(node) === 'added') {
        return (_.isPlainObject(getValue(node)))
          ? `Property '${newPath.join('.')}' was added with value: [complex value]`
          : `Property '${newPath.join('.')}' was added with value: ${modifyValue(getValue(node))}`;
      }
      if (getType(node) === 'deleted') {
        return `Property '${newPath.join('.')}' was removed`;
      }
      if (getType(node) === 'changed') {
        const [value1, value2] = getValue(node);
        if (_.isPlainObject(value1) || _.isPlainObject(value2)) {
          return _.isPlainObject(value1)
            ? `Property '${newPath.join('.')}' was updated. From [complex value] to ${modifyValue(value2)}`
            : `Property '${newPath.join('.')}' was updated. From ${modifyValue(value1)} to [complex value]`;
        }
        if (!_.isPlainObject(value1) && !_.isPlainObject(value2)) {
          return `Property '${newPath.join('.')}' was updated. From ${modifyValue(value1)} to ${modifyValue(value2)}`;
        }
      }
      if (getType(node) === 'nested') {
        const currentNodeType = getType(node);
        return `${iter(getValue(node), newPath, currentNodeType)}`;
      }
      return '';
    });
    return result
      .filter((item) => item !== '')
      .join('\n');
  };
  return iter(diff, [], 'nested');
};
