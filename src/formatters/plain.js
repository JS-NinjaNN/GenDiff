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

      switch (getType(node)) {
        case 'added':
          return (_.isPlainObject(getValue(node)))
            ? `Property '${newPath.join('.')}' was added with value: [complex value]`
            : `Property '${newPath.join('.')}' was added with value: ${modifyValue(getValue(node))}`;
        case 'deleted':
          return `Property '${newPath.join('.')}' was removed`;
        case 'changed': {
          const [value1, value2] = getValue(node);
          if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
            return `Property '${newPath.join('.')}' was updated. From [complex value] to [complex value]`;
          }
          if (_.isPlainObject(value1) || _.isPlainObject(value2)) {
            return _.isPlainObject(value1)
              ? `Property '${newPath.join('.')}' was updated. From [complex value] to ${modifyValue(value2)}`
              : `Property '${newPath.join('.')}' was updated. From ${modifyValue(value1)} to [complex value]`;
          }
          if (!_.isPlainObject(value1) && !_.isPlainObject(value2)) {
            return `Property '${newPath.join('.')}' was updated. From ${modifyValue(value1)} to ${modifyValue(value2)}`;
          }
          break;
        }
        case 'nested':
          return `${iter(getValue(node), newPath, getType(node))}`;
        // no default
      }
      return '';
    });
    return [...result]
      // Илья, вопрос. Почему тут пришлось использовать filter для избавления от пустых строк
      // (в выводе выглядят как пропуск строки)
      // хотя в stylish без него они не отображаются?
      .filter((item) => item !== '')
      .join('\n');
  };
  return iter(diff, [], 'nested');
};
