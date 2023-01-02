import _ from 'lodash';
import { getType, getValue, getKey } from './utils.js';

const modifyValue = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  return ((typeof value === 'string') ? `'${value}'` : `${value}`);
};

const formatPlain = (tree, path = [], prevNodeType = 'nested') => {
  const lines = tree
    .filter((node) => getType(node) !== 'unchanged')
    .map((node) => {
      const newPath = (prevNodeType === 'nested')
        ? [...path, getKey(node)]
        : [];
      switch (getType(node)) {
        case 'added':
          return `Property '${newPath.join('.')}' was added with value: ${modifyValue(getValue(node))}`;
        case 'deleted':
          return `Property '${newPath.join('.')}' was removed`;
        case 'changed': {
          const [value1, value2] = getValue(node);
          return `Property '${newPath.join('.')}' was updated. From ${modifyValue(value1)} to ${modifyValue(value2)}`;
        }
        // no default
      }
      return `${formatPlain(getValue(node), newPath, getType(node))}`;
    });
  return lines.join('\n');
};

export default formatPlain;
