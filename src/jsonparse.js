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
const genDiff = (filepath1, filepath2) => {
  const contentFromFile1 = getContenet(filepath1);
  const contentFromFile2 = getContenet(filepath2);
  const keysFromFile1 = getKeys(contentFromFile1);
  const keysFromFile2 = getKeys(contentFromFile2);
  const sortedMergedKeys = _.sortBy(_.union(keysFromFile1, keysFromFile2));
  const result = sortedMergedKeys.reduce((acc, item) => {
    if (_.has(contentFromFile1, item) && _.has(contentFromFile2, item)) {
      return (contentFromFile1[item] === contentFromFile2[item])
        ? addDifferences(acc, item, contentFromFile1, contentFromFile2, 'same')
        : addDifferences(acc, item, contentFromFile1, contentFromFile2, 'different');
    }
    return _.has(contentFromFile2, item)
      ? addDifferences(acc, item, contentFromFile1, contentFromFile2, 'added')
      : addDifferences(acc, item, contentFromFile1, contentFromFile2, 'removed');
  }, ['{']);
  result.push('}');
  return result.join('\n');
};
export default genDiff;
