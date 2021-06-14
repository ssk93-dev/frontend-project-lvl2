import getDiffereces from './differencesFactory.js';
import formatDiff from './formatter.js';
import getContent from './contentFactory.js';

const genDiff = (filepath1, filepath2) => {
  const contentFromFile1 = getContent(filepath1);
  const contentFromFile2 = getContent(filepath2);
  const differences = getDiffereces(contentFromFile1, contentFromFile2);
  return formatDiff(differences);
};
export default genDiff;
