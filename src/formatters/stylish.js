import _ from 'lodash';
import { getType, getValue, getKey } from './utils.js';

const indent = (depth, isFull = false) => {
  const spacesCount = 4;
  const indentSize = depth * spacesCount;
  const replacer = ' ';
  if (isFull === true) {
    return replacer.repeat(indentSize);
  }
  return replacer.repeat(indentSize - 2);
};

const stringify = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return String(data);
  }
  const isFull = true;
  const lines = Object
    .entries(data)
    .map(([key, value]) => `${indent(depth, isFull)}${key}: ${stringify(value, depth + 1)}`);
  return `{\n${lines.join('\n')}\n${indent(depth).substring(2)}}`;
};

const formatStylish = (tree, depth = 1) => {
  const isFull = true;
  const lines = tree.map((node) => {
    switch (getType(node)) {
      case 'added':
        return `${indent(depth)}+ ${getKey(node)}: ${stringify(getValue(node), depth + 1)}`;
      case 'deleted':
        return `${indent(depth)}- ${getKey(node)}: ${stringify(getValue(node), depth + 1)}`;
      case 'unchanged':
        return `${indent(depth, isFull)}${getKey(node)}: ${stringify(getValue(node), depth + 1)}`;
      case 'changed': {
        const [value1, value2] = getValue(node);
        return `${indent(depth)}- ${getKey(node)}: ${stringify(value1, depth + 1)}\n${indent(depth)}+ ${getKey(node)}: ${stringify(value2, depth + 1)}`;
      }
      // no default
    }
    return `${indent(depth, isFull)}${getKey(node)}: ${formatStylish(getValue(node), depth + 1)}`;
  });
  return `{\n${lines.join('\n')}\n${indent(depth).substring(2)}}`;
};

export default formatStylish;
