import * as fs from 'fs';
import _ from 'lodash';
import path from 'path';

const getPath = (filename) => path.resolve(process.cwd(), filename);
const getContenet = (filename) => JSON.parse(fs.readFileSync(getPath(filename), 'utf8'));
const getKeys = (object) => Object.keys(object);
const addDifferences = (acc, key, content1, content2, condition) => {
  switch (condition) {
    case 'same':
      acc.push(`    ${key}: ${content1[key]}`);
      return acc;
    case 'different':
      acc.push(`  - ${key}: ${content1[key]}\n  + ${key}: ${content2[key]}`);
      return acc;
    case 'added':
      acc.push(`  + ${key}: ${content2[key]}`);
      return acc;
    case 'removed':
      acc.push(`  - ${key}: ${content1[key]}`);
      return acc;
    default:
      return acc;
  }
};
const getDiffereces = (keys, content1, content2) => {
  const differences = keys.reduce((acc, item) => {
    if (_.has(content1, item) && _.has(content2, item)) {
      return (content1[item] === content2[item])
        ? addDifferences(acc, item, content1, content2, 'same')
        : addDifferences(acc, item, content1, content2, 'different');
    }
    return _.has(content2, item)
      ? addDifferences(acc, item, content1, content2, 'added')
      : addDifferences(acc, item, content1, content2, 'removed');
  }, ['{']);
  differences.push('}');
  return differences.join('\n');
};
const genDiff = (filepath1, filepath2) => {
  const contentFromFile1 = getContenet(filepath1);
  const contentFromFile2 = getContenet(filepath2);
  const keysFromFile1 = getKeys(contentFromFile1);
  const keysFromFile2 = getKeys(contentFromFile2);
  const sortedMergedKeys = _.sortBy(_.union(keysFromFile1, keysFromFile2));
  return getDiffereces(sortedMergedKeys, contentFromFile1, contentFromFile2);
};
export default genDiff;
