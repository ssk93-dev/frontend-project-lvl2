import getDiffereces from './differencesFactory.js';
import formatters from './formatter.js';
import getContent from './contentFactory.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const contentFromFile1 = getContent(filepath1);
  const contentFromFile2 = getContent(filepath2);
  const differences = getDiffereces(contentFromFile1, contentFromFile2);
  return formatters[format](differences);
};
export default genDiff;
