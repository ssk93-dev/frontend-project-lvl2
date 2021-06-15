import getDiffereces from './differencesTreeMaker.js';
import formatters from './formatters/index.js';
import getContent from './contentExtractor.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const contentFromFile1 = getContent(filepath1);
  const contentFromFile2 = getContent(filepath2);
  const differences = getDiffereces(contentFromFile1, contentFromFile2);
  return formatters[format](differences);
};
export default genDiff;
