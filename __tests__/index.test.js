import { expect, test } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import * as fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('genDiff json-json stylish', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json')))
    .toEqual(fs.readFileSync(getFixturePath('rightStylish.txt'), 'utf-8'));
});
test('genDiff yaml-yml stylish', () => {
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml')))
    .toEqual(fs.readFileSync(getFixturePath('rightStylish.txt'), 'utf-8'));
});
test('genDiff json-yml stylish', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.yml'), 'stylish'))
    .toEqual(fs.readFileSync(getFixturePath('rightStylish.txt'), 'utf-8'));
});
test('genDiff json-yml plain', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.yml'), 'plain'))
    .toEqual(fs.readFileSync(getFixturePath('rightPlain.txt'), 'utf-8'));
});
