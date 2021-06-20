import { expect, test } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import * as fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const filesToCompare = [
  { file1: 'file1.json', file2: 'file2.json' },
  { file1: 'file1.yaml', file2: 'file2.yml' },
  { file1: 'file1.json', file2: 'file2.yml' },
];

test.each(filesToCompare)('genDiff($file1, $file2)', ({ file1, file2 }) => {
  expect(genDiff(getFixturePath(file1), getFixturePath(file2)))
    .toEqual(fs.readFileSync(getFixturePath('result_Stylish.txt'), 'utf-8'));
  expect(genDiff(getFixturePath(file1), getFixturePath(file2), 'stylish'))
    .toEqual(fs.readFileSync(getFixturePath('result_Stylish.txt'), 'utf-8'));
  expect(genDiff(getFixturePath(file1), getFixturePath(file2), 'plain'))
    .toEqual(fs.readFileSync(getFixturePath('result_Plain.txt'), 'utf-8'));
  expect(genDiff(getFixturePath(file1), getFixturePath(file2), 'json'))
    .toEqual(fs.readFileSync(getFixturePath('result_Json.txt'), 'utf-8'));
});
