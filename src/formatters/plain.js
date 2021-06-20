import _ from 'lodash';

const getValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};
const getName = (item, parent) => (parent === '' ? `${item.name}` : `${parent}.${item.name}`);
const plain = (differences, parent = '') => {
  const arrayOfDifferences = differences
    .filter((item) => item.type !== 'unchanged')
    .map((item) => {
      switch (item.type) {
        case 'changed':
          return `Property '${getName(item, parent)}' was updated. From ${getValue(item.value.oldValue)} to ${getValue(item.value.newValue)}`;
        case 'added':
          return `Property '${getName(item, parent)}' was added with value: ${getValue(item.value)}`;
        case 'removed':
          return `Property '${getName(item, parent)}' was removed`;
        case 'parent':
          return plain(item.children, getName(item, parent));
        default:
          throw new Error(`Type ${item.type} of ${item.name} not recognized`);
      }
    });
  return arrayOfDifferences.join('\n');
};
const makePlain = (differences) => plain(differences, '');

export default makePlain;
