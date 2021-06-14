import _ from 'lodash';

const getDiffereces = (contentFromFile1, contentFromFile2) => {
  const keysFromFile1 = _.keys(contentFromFile1);
  const keysFromFile2 = _.keys(contentFromFile2);
  const commonKeys = _.union(keysFromFile1, keysFromFile2);
  const differences = commonKeys.map((item) => {
    if (_.isObject(contentFromFile1[item]) && _.isObject(contentFromFile2[item])) {
      return { name: item, children: getDiffereces(contentFromFile1[item], contentFromFile2[item]), type: 'parent' };
    }
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
