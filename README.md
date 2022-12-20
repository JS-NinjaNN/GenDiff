### Hexlet tests and linter status:

[![Actions Status](https://github.com/ToxicNN/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/ToxicNN/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/80f69bf1086b2e740acc/maintainability)](https://codeclimate.com/github/ToxicNN/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/80f69bf1086b2e740acc/test_coverage)](https://codeclimate.com/github/ToxicNN/frontend-project-46/test_coverage)
[![tests](https://github.com/ToxicNN/frontend-project-46/actions/workflows/gendiff.yml/badge.svg)](https://github.com/ToxicNN/frontend-project-46/actions/workflows/gendiff.yml)

---

# Description

Gendiff is a cli-app that generates the difference between two files and outputs it in one of three formats.
The app works with formats json and yaml(yml).
Supported output formats: stylish, plain and json.

---

## Minimum system requirements

Node.js 13.2.0 or higher

---

## Installation:

Attention! Commands must be run from the app directory!

Installing dependencies

```
make install
```

Installing a package with app

The following command will be run as root!

```
make link
```
[![asciicast](https://asciinema.org/a/5LPzQEuaOwwRPk0zyNp4FpiUy.svg)](https://asciinema.org/a/5LPzQEuaOwwRPk0zyNp4FpiUy)
---

## Launching app:

```
gendiff [format] <filepath1> <filepath2>
```
### Supported formats:

#### stylish
[![asciicast](https://asciinema.org/a/CA2isfWbkQT5HMQ9uUQRfnCj2.svg)](https://asciinema.org/a/CA2isfWbkQT5HMQ9uUQRfnCj2)

#### plain

[![asciicast](https://asciinema.org/a/IDUgBDHG4jZxdhxXkmtfjId10.svg)](https://asciinema.org/a/IDUgBDHG4jZxdhxXkmtfjId10)

#### json

[![asciicast](https://asciinema.org/a/dNcoNgszhyiN0xBvSHAVf0wG4.svg)](https://asciinema.org/a/dNcoNgszhyiN0xBvSHAVf0wG4)