import _ from 'lodash';

const stringify = (value) => {
  if (_.isObjectLike(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const iter = (tree, path = [], prevNodeType = 'nested') => tree
  .filter((node) => node.type !== 'unchanged')
  .map((node) => {
    const newPath = (prevNodeType === 'nested')
      ? [...path, node.key]
      : [];
    switch (node.type) {
      case 'added':
        return `Property '${newPath.join('.')}' was added with value: ${stringify(node.value)}`;
      case 'deleted':
        return `Property '${newPath.join('.')}' was removed`;
      case 'changed': {
        return `Property '${newPath.join('.')}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
      }
      case 'nested':
        return iter(node.children, newPath, node.type).join('\n');
      default:
        throw new Error(`Unknown type ${node.type}.\nSupported types: added, deleted, unchanged, changed and nested.`);
    }
  });

export default (tree) => iter(tree).join('\n');
