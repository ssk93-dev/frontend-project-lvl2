import * as fs from 'fs';
import _ from 'lodash';
import path from 'path';

const getPath = (filename) => path.resolve(process.cwd(), filename);
const getContent = (filename) => JSON.parse(fs.readFileSync(getPath(filename), 'utf8'));
const getKeys = (object) => Object.keys(object);
const formatDiff = (differences) => {
  const formattedDiff = differences.map((item) => {
    switch (item.type) {
      case 'unchanged':
        return `    ${item.name}: ${item.value}`;
      case 'changed':
        return `  - ${item.name}: ${item.value.oldValue}\n  + ${item.name}: ${item.value.newValue}`;
      case 'added':
        return `  + ${item.name}: ${item.value}`;
      case 'removed':
        return `  - ${item.name}: ${item.value}`;
      default:
        return '';
    }
  });
  formattedDiff.unshift('{');
  formattedDiff.push('}');
  return formattedDiff.join('\n');
};
const getDiffereces = (contentFromFile1, contentFromFile2) => {
  const keysFromFile1 = getKeys(contentFromFile1);
  const keysFromFile2 = getKeys(contentFromFile2);
  const commonKeys = _.union(keysFromFile1, keysFromFile2);
  const differences = commonKeys.map((item) => {
    if (!_.has(contentFromFile1, item)) {
      return {
        name: item,
        value: contentFromFile2[item],
        type: 'added',
      };
    }
    if (!_.has(contentFromFile2, item)) {
      return {
        name: item,
        value: contentFromFile1[item],
        type: 'removed',
      };
    }
    if (contentFromFile1[item] === contentFromFile2[item]) {
      return {
        name: item,
        value: contentFromFile1[item],
        type: 'unchanged',
      };
    }
    return {
      name: item,
      value: { oldValue: contentFromFile1[item], newValue: contentFromFile2[item] },
      type: 'changed',
    };
  });
  return _.sortBy(differences, 'name');
};
const genDiff = (filepath1, filepath2) => {
  const contentFromFile1 = getContent(filepath1);
  const contentFromFile2 = getContent(filepath2);
  const differences = getDiffereces(contentFromFile1, contentFromFile2);
  return formatDiff(differences);
};
export default genDiff;
