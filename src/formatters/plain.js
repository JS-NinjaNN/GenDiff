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

const buildPath = (node, currentPath) => (currentPath !== '' ? `${currentPath}.${node.key}` : String(node.key));

const iter = (tree, path) => tree
  .filter((node) => node.type !== 'unchanged')
  .map((node) => {
    const currentPath = buildPath(node, path);
    switch (node.type) {
      case 'added':
        return `Property '${currentPath}' was added with value: ${stringify(node.value)}`;
      case 'deleted':
        return `Property '${currentPath}' was removed`;
      case 'changed': {
        return `Property '${currentPath}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
      }
      case 'nested':
        return iter(node.children, currentPath).join('\n');
      default:
        throw new Error(`Unknown node type ${node.type}.`);
    }
  });

export default (tree) => iter(tree, '').join('\n');
