/* eslint-disable import/extensions */
import _ from 'lodash';
import { getType, getValue, getKey } from './utils.js';

const modifyValue = (value) => ((typeof value === 'string') ? `'${value}'` : `${value}`);

export default (diff) => {
  const iter = (tree, path, prevNodeType) => {
    const result = tree.map((node) => {
      const newPath = (prevNodeType === 'nested')
        ? [...path]
        : [];
      newPath.push(getKey(node));
      let string = '';
      if (getType(node) === 'added') {
        string = (_.isPlainObject(getValue(node)))
          ? string = `Property '${newPath.join('.')}' was added with value: [complex value]`
          : `Property '${newPath.join('.')}' was added with value: ${modifyValue(getValue(node))}`;
      } else if (getType(node) === 'deleted') {
        string = `Property '${newPath.join('.')}' was removed`;
      } else if (getType(node) === 'changed') {
        const [value1, value2] = getValue(node);
        if (_.isPlainObject(value1) || _.isPlainObject(value2)) {
          string = _.isPlainObject(value1)
            ? `Property '${newPath.join('.')}' was updated. From [complex value] to ${modifyValue(value2)}`
            : `Property '${newPath.join('.')}' was updated. From ${modifyValue(value1)} to [complex value]`;
        } else {
          string = `Property '${newPath.join('.')}' was updated. From ${modifyValue(value1)} to ${modifyValue(value2)}`;
        }
      } else if (getType(node) === 'unchanged') {
        return '';
      } else if (getType(node) === 'nested') {
        const currentNodeType = getType(node);
        string = `${iter(getValue(node), newPath, currentNodeType)}`;
      }
      return string;
    });
    return result
      .filter((item) => item !== '')
      .join('\n');
  };
  return iter(diff, [], 'nested');
};
