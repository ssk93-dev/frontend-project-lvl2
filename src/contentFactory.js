import * as fs from 'fs';
import path from 'path';
import parse from './parsers.js';

const getPath = (filename) => path.resolve(process.cwd(), filename);
const getContent = (filename) => {
  const filepath = getPath(filename);
  const extension = path.extname(filepath);
  return parse(fs.readFileSync(filepath, 'utf-8'), extension);
};

export default getContent;
