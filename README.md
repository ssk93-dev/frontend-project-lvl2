## Hexlet tests and linter status:
[![Actions Status](https://github.com/ssk93-dev/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/ssk93-dev/frontend-project-lvl2/actions)
[![tests and lint](https://github.com/ssk93-dev/frontend-project-lvl2/actions/workflows/testAndLint.yml/badge.svg)](https://github.com/ssk93-dev/frontend-project-lvl2/actions/workflows/testAndLint.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/913e28348fdff54461c2/maintainability)](https://codeclimate.com/github/ssk93-dev/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/913e28348fdff54461c2/test_coverage)](https://codeclimate.com/github/ssk93-dev/frontend-project-lvl2/test_coverage)

## About
Compares two configuration files and shows a difference.<br>
### Supported file extensions
JSON, yml, yaml
### Supported output formats
json, plain, stylish
### How to use
```sh
gendiff [options] <filepath1> <filepath2>
```
Options:
* -V, --version        output the version number
* -f, --format [type]  output format (choices: "stylish", "plain", "json", default: stylish)
* -h, --help           display help for command
### Installation
```sh
git clone
make install
npm link
```
### Example for JSON and yml files
[![asciicast](https://asciinema.org/a/zX7hJjqMjmGYKhj67HVl3AHlJ.svg)](https://asciinema.org/a/zX7hJjqMjmGYKhj67HVl3AHlJ)
