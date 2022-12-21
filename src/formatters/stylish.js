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
    const indentForAdded = '+ '.padStart(indentSize, ' ');
    const indentForDeleted = '- '.padStart(indentSize, ' ');
    const currentIndent = indent.repeat(indentSize);
    const bracketIndent = indent.repeat(indentSize - spacesCount);
    const result = tree.map((node) => {
      if (getType(node) === 'added') {
        return `${indentForAdded}${getKey(node)}: ${stringify(getValue(node), ' ', 4, depth + 1)}`;
      }
      if (getType(node) === 'deleted') {
        return `${indentForDeleted}${getKey(node)}: ${stringify(getValue(node), ' ', 4, depth + 1)}`;
      }
      if (getType(node) === 'unchanged') {
        return `${currentIndent}${getKey(node)}: ${stringify(getValue(node), ' ', 4, depth + 1)}`;
      }
      if (getType(node) === 'changed') {
        const [value1, value2] = getValue(node);
        return `${indentForDeleted}${getKey(node)}: ${stringify(value1, ' ', 4, depth + 1)}\n${indentForAdded}${getKey(node)}: ${stringify(value2, ' ', 4, depth + 1)}`;
      }
      return `${currentIndent}${getKey(node)}: ${iter(getValue(node), depth + 1)}`;
    });
    return [
      '{',
      ...result,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return iter(diff, 1);
};
