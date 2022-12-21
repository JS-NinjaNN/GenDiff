/* eslint-disable import/extensions */
import _ from 'lodash';
import { getType, getValue, getKey } from './utils.js';

const stringify = (value, replacer, spacesCount, currentDepth) => {
  const iter = (currentValue, depth) => {
    if (!_.isPlainObject(currentValue)) {
      return `${currentValue}`;
    }

    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`);
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return iter(value, currentDepth);
};

export default (diff) => {
  const iter = (tree, depth) => {
    const spacesCount = 4;
    const indentSize = depth * spacesCount;
    const indent = ' ';
    const currentIndent = indent.repeat(indentSize);
    const currentIndentForAdded = '+ '.padStart(indentSize, ' ');
    const currentIndentForDeleted = '- '.padStart(indentSize, ' ');
    const bracketIndent = indent.repeat(indentSize - spacesCount);
    const result = tree.map((node) => {
      switch (getType(node)) {
        case 'added':
          return `${currentIndentForAdded}${getKey(node)}: ${stringify(getValue(node), ' ', 4, depth + 1)}`;
        case 'deleted':
          return `${currentIndentForDeleted}${getKey(node)}: ${stringify(getValue(node), ' ', 4, depth + 1)}`;
        case 'unchanged':
          return `${currentIndent}${getKey(node)}: ${stringify(getValue(node), ' ', 4, depth + 1)}`;
        case 'changed': {
          const [value1, value2] = getValue(node);
          return `${currentIndentForDeleted}${getKey(node)}: ${stringify(value1, ' ', 4, depth + 1)}\n${currentIndentForAdded}${getKey(node)}: ${stringify(value2, ' ', 4, depth + 1)}`;
        }
        case 'nested':
          return `${currentIndent}${getKey(node)}: ${iter(getValue(node), depth + 1)}`;
        // no default
      }
      return '';
    });
    return [
      '{',
      ...result,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return iter(diff, 1);
};
