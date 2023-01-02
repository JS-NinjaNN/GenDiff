import _ from 'lodash';
import { getType, getValue, getKey } from './utils.js';

const makeIndent = (depth, type = '') => {
  const spacesCount = 4;
  const indentSize = depth * spacesCount;
  const indent = ' ';
  switch (type) {
    case 'added':
      return '+ '.padStart(indentSize, indent);
    case 'deleted':
      return '- '.padStart(indentSize, indent);
    case 'bracket':
      return indent.repeat(indentSize - spacesCount);
    // no default
  }
  return indent.repeat(indentSize);
};

const stringify = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return String(data);
  }
  const lines = Object
    .entries(data)
    .map(([key, value]) => `${makeIndent(depth)}${key}: ${stringify(value, depth + 1)}`);
  return `{\n${lines.join('\n')}\n${makeIndent(depth, 'bracket')}}`;
};

const formatStylish = (tree, depth = 1) => {
  const lines = tree.map((node) => {
    switch (getType(node)) {
      case 'added':
        return `${makeIndent(depth, 'added')}${getKey(node)}: ${stringify(getValue(node), depth + 1)}`;
      case 'deleted':
        return `${makeIndent(depth, 'deleted')}${getKey(node)}: ${stringify(getValue(node), depth + 1)}`;
      case 'unchanged':
        return `${makeIndent(depth)}${getKey(node)}: ${stringify(getValue(node), depth + 1)}`;
      case 'changed': {
        const [value1, value2] = getValue(node);
        return `${makeIndent(depth, 'deleted')}${getKey(node)}: ${stringify(value1, depth + 1)}\n${makeIndent(depth, 'added')}${getKey(node)}: ${stringify(value2, depth + 1)}`;
      }
      // no default
    }
    return `${makeIndent(depth)}${getKey(node)}: ${formatStylish(getValue(node), depth + 1)}`;
  });
  return `{\n${lines.join('\n')}\n${makeIndent(depth, 'bracket')}}`;
};

export default formatStylish;
