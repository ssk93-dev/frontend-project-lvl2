import _ from 'lodash';

const getKeys = (object) => Object.keys(object);
const getDiffereces = (contentFromFile1, contentFromFile2) => {
  const keysFromFile1 = getKeys(contentFromFile1);
  const keysFromFile2 = getKeys(contentFromFile2);
  const commonKeys = _.union(keysFromFile1, keysFromFile2);
  const differences = commonKeys.map((item) => {
    if (!_.has(contentFromFile1, item)) {
      return { name: item, value: contentFromFile2[item], type: 'added' };
    }
    if (!_.has(contentFromFile2, item)) {
      return { name: item, value: contentFromFile1[item], type: 'removed' };
    }
    if (contentFromFile1[item] === contentFromFile2[item]) {
      return { name: item, value: contentFromFile1[item], type: 'unchanged' };
    }
    return {
      name: item,
      value: { oldValue: contentFromFile1[item], newValue: contentFromFile2[item] },
      type: 'changed',
    };
  });
  return _.sortBy(differences, 'name');
};

export default getDiffereces;
