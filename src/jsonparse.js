import * as fs from 'fs';
import _ from 'lodash';
import path from 'path';

const getPath = (filename) => path.resolve(process.cwd(), filename);
const genDiff = (filepath1, filepath2) => {
  const file1 = fs.readFileSync(getPath(filepath1), 'utf8');
  const file2 = fs.readFileSync(getPath(filepath2), 'utf8');
  const contentFromFile1 = JSON.parse(file1);
  const contentFromFile2 = JSON.parse(file2);
  const keysFromFile1 = Object.keys(contentFromFile1);
  const keysFromFile2 = Object.keys(contentFromFile2);
  const sortedMergedKeys = _.sortBy(_.union(keysFromFile1, keysFromFile2));
  const result = sortedMergedKeys.reduce((acc, item) => {
    if (_.has(contentFromFile1, item) && _.has(contentFromFile2, item)) {
      if (contentFromFile1[item] === contentFromFile2[item]) {
        acc.push(`    ${item}: ${contentFromFile1[item]}`);
        return acc;
      }
      acc.push(
        `  - ${item}: ${contentFromFile1[item]}\n  + ${item}: ${contentFromFile2[item]}`,
      );
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
