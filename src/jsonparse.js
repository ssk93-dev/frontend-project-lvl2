import * as fs from 'fs';
import _ from 'lodash';
import path from 'path';

const genDiff = (filepath1, filepath2) => {
  const path1 = path.resolve(process.cwd(), filepath1);
  const path2 = path.resolve(process.cwd(), filepath2);
  const contentFromFile1 = JSON.parse(fs.readFileSync(path1, 'utf8'));
  const contentFromFile2 = JSON.parse(fs.readFileSync(path2, 'utf8'));
  const mergedKeys = _.union(Object.keys(contentFromFile1), Object.keys(contentFromFile2));
  const sortedMergedKeys = _.sortBy(mergedKeys);
  const result = sortedMergedKeys.reduce((acc, item) => {
    if (_.has(contentFromFile1, item) && _.has(contentFromFile2, item)) {
      if (contentFromFile1[item] === contentFromFile2[item]) {
        acc.push(`    ${item}: ${contentFromFile1[item]}`);
        return acc;
      }
      acc.push(`  - ${item}: ${contentFromFile1[item]}\n  + ${item}: ${contentFromFile2[item]}`);
      return acc;
    }
    if (_.has(contentFromFile2, item)) {
      acc.push(`  + ${item}: ${contentFromFile2[item]}`);
      return acc;
    }
    acc.push(`  - ${item}: ${contentFromFile1[item]}`);
    return acc;
  }, []);
  return `{\n${result.join('\n')}\n}`;
};
export default genDiff;
