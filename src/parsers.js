import yaml from 'js-yaml';

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.load,
  '.yaml': yaml.load,
};
const parse = (readFile, extension) => parsers[extension](readFile);

export default parse;
