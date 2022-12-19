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

export { getType, getKey, getValue };
