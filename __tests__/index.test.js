import { expect, test } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import * as fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test.each([
  {
    file1: 'file1.json', file2: 'file2.json', format: undefined, result: 'result_Stylish.txt',
  },
  {
    file1: 'file1.yaml', file2: 'file2.yml', format: 'stylish', result: 'result_Stylish.txt',
  },
  {
    file1: 'file1.json', file2: 'file2.yml', format: 'stylish', result: 'result_Stylish.txt',
  },
  {
    file1: 'file1.json', file2: 'file2.json', format: 'plain', result: 'result_Plain.txt',
  },
  {
    file1: 'file1.yaml', file2: 'file2.yml', format: 'plain', result: 'result_Plain.txt',
  },
  {
    file1: 'file1.json', file2: 'file2.yml', format: 'plain', result: 'result_Plain.txt',
  },
  {
    file1: 'file1.json', file2: 'file2.json', format: 'json', result: 'result_Json.txt',
  },
  {
    file1: 'file1.yaml', file2: 'file2.yml', format: 'json', result: 'result_Json.txt',
  },
  {
    file1: 'file1.json', file2: 'file2.yml', format: 'json', result: 'result_Json.txt',
  },
])('genDiff($file1, $file2), $format', ({
  file1, file2, format, result,
}) => {
  expect(genDiff(getFixturePath(file1), getFixturePath(file2), format))
    .toEqual(fs.readFileSync(getFixturePath(result), 'utf-8'));
});
