import _ from 'lodash';

const modifyValue = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  return ((typeof value === 'string') ? `'${value}'` : `${value}`);
};

const iter = (tree, path = [], prevNodeType = 'nested') => {
  const lines = tree
    .filter((node) => node.type !== 'unchanged')
    .map((node) => {
      const newPath = (prevNodeType === 'nested')
        ? [...path, node.key]
        : [];
      switch (node.type) {
        case 'added':
          return `Property '${newPath.join('.')}' was added with value: ${modifyValue(node.value)}`;
        case 'deleted':
          return `Property '${newPath.join('.')}' was removed`;
        case 'changed': {
          return `Property '${newPath.join('.')}' was updated. From ${modifyValue(node.value1)} to ${modifyValue(node.value2)}`;
        }
        case 'nested':
          return `${iter(node.children, newPath, node.type)}`;
        default:
          throw new Error(`Unknown type ${node.type}.\nSupported types: added, deleted, unchanged, changed and nested.`);
      }
    });
  return lines.join('\n');
};

export default iter;
