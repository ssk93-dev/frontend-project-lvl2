import * as fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildDifferencesTree from './differencesTreeMaker.js';
import makeFormattedTree from './formatters/index.js';

const getPath = (filename) => path.resolve(process.cwd(), filename);
const getFileContent = (filename) => {
  const filepath = getPath(filename);
  const extension = path.extname(filepath).slice(1);
  return parse(fs.readFileSync(filepath, 'utf-8'), extension);
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const contentFromFile1 = getFileContent(filepath1);
  const contentFromFile2 = getFileContent(filepath2);
  const differencesTree = buildDifferencesTree(contentFromFile1, contentFromFile2);
  return makeFormattedTree(differencesTree, format);
};
export default genDiff;
