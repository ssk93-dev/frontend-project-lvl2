## Hexlet tests and linter status:
[![Actions Status](https://github.com/ssk93-dev/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/ssk93-dev/frontend-project-lvl2/actions)
[![tests and lint](https://github.com/ssk93-dev/frontend-project-lvl2/actions/workflows/testAndLint.yml/badge.svg)](https://github.com/ssk93-dev/frontend-project-lvl2/actions/workflows/testAndLint.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/913e28348fdff54461c2/maintainability)](https://codeclimate.com/github/ssk93-dev/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/913e28348fdff54461c2/test_coverage)](https://codeclimate.com/github/ssk93-dev/frontend-project-lvl2/test_coverage)

## About
Compares two configuration files and shows a difference.<br>
### Example for 2 JSON files
```sh
{
    "host": "hexlet.io",
    "timeout": 50,
    "proxy": "123.234.53.22",
    "follow": false
  }
```
```sh
{
    "timeout": 20,
    "verbose": true,
    "host": "hexlet.io"
  }
```
[![asciicast](https://asciinema.org/a/ZYOUPs5v95Y8mwZOQIxE5lIH9.svg)](https://asciinema.org/a/ZYOUPs5v95Y8mwZOQIxE5lIH9)
### Example for 2 YML files
```sh
    host: hexlet.io
    timeout: 50
    proxy: 123.234.53.22
    follow: false
```
```sh
    timeout: 20
    verbose: true
    host: hexlet.io
```
[![asciicast](https://asciinema.org/a/n5nroXdyqkMvDXHK7o0gNIKNo.svg)](https://asciinema.org/a/n5nroXdyqkMvDXHK7o0gNIKNo)