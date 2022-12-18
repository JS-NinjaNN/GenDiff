import _ from 'lodash';

const stringify = (value, replacer, spacesCount, currentDepth) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
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

const getType = (node) => node.type;
const getKey = (node) => node.key;
const getValue = (node) => {
  const standardValues = ['added', 'unchanged', 'deleted'];
  if (standardValues.includes(getType(node))) {
    return node.value;
  }
  if (getType(node) === 'changed') {
    return [node.value1, node.value2];
  }
  return node.children;
};

export default (tree) => {
  const iter = (node, depth) => {
    const spacesCount = 4;
    const indent = ' ';
    const indentSize = depth * spacesCount;
    const indentForAdded = '+ '.padStart(indentSize, ' ');
    const indentForDeleted = '- '.padStart(indentSize, ' ');
    const currentIndent = indent.repeat(indentSize);
    const bracketIndent = indent.repeat(indentSize - spacesCount);
    const result = node.map((child) => {
      let string = '';
      if (getType(child) === 'added') {
        string = `${indentForAdded}${getKey(child)}: ${stringify(getValue(child), ' ', 4, depth + 1)}`;
      } else if (getType(child) === 'deleted') {
        string = `${indentForDeleted}${getKey(child)}: ${stringify(getValue(child), ' ', 4, depth + 1)}`;
      } else if (getType(child) === 'unchanged') {
        string = `${currentIndent}${getKey(child)}: ${stringify(getValue(child), ' ', 4, depth + 1)}`;
      } else if (getType(child) === 'changed') {
        const [value1, value2] = getValue(child);
        string = `${indentForDeleted}${getKey(child)}: ${stringify(value1, ' ', 4, depth + 1)}\n${indentForAdded}${getKey(child)}: ${stringify(value2, ' ', 4, depth + 1)}`;
      } else if (getType(child) === 'nested') {
        string = `${currentIndent}${getKey(child)}: ${iter(getValue(child), depth + 1)}`;
      }
      return string;
    });
    return ['{', ...result, `${bracketIndent}}`].join('\n');
  };
  return iter(tree, 1);
};
