import _ from 'lodash';

const IS_FULL = true;
const spacesCount = 4;
const replacer = ' ';

const indent = (depth, isFull = false) => {
  const indentSize = depth * spacesCount;
  return isFull ? replacer.repeat(indentSize) : replacer.repeat(indentSize - 2);
};

const stringify = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return String(data);
  }
  const lines = Object
    .entries(data)
    .map(([key, value]) => `${indent(depth + 1, IS_FULL)}${key}: ${stringify(value, depth + 1)}`);
  return `{\n${lines.join('\n')}\n${indent(depth, IS_FULL)}}`;
};

const iter = (tree, depth = 1) => tree.map((node) => {
  switch (node.type) {
    case 'added':
      return `${indent(depth)}+ ${node.key}: ${stringify(node.value, depth)}`;
    case 'deleted':
      return `${indent(depth)}- ${node.key}: ${stringify(node.value, depth)}`;
    case 'unchanged':
      return `${indent(depth, IS_FULL)}${node.key}: ${stringify(node.value, depth)}`;
    case 'changed': {
      return `${indent(depth)}- ${node.key}: ${stringify(node.value1, depth)}\n${indent(depth)}+ ${node.key}: ${stringify(node.value2, depth)}`;
    }
    case 'nested': {
      const lines = iter(node.children, depth + 1);
      return `${indent(depth, IS_FULL)}${node.key}: {\n${lines.join('\n')}\n${indent(depth, IS_FULL)}}`;
    }
    default:
      throw new Error(`Unknown node type ${node.type}.`);
  }
});

export default (tree) => {
  const result = iter(tree, 1);
  return `{\n${result.join('\n')}\n}`;
};
