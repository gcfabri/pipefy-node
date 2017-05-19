# pipefy-node

[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/gcfabri/pipefy-node/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/pipefy-node.svg?style=flat-square)](https://www.npmjs.com/package/pipefy-node)
[![Travis](https://img.shields.io/travis/gcfabri/pipefy-node.svg?style=flat-square)](https://travis-ci.org/gcfabri/pipefy-node)
[![Coveralls](https://img.shields.io/coveralls/gcfabri/pipefy-node.svg?style=flat-square)](https://coveralls.io/github/gcfabri/pipefy-node)
[![npm](https://img.shields.io/npm/dt/pipefy-node.svg?style=flat-square)](https://www.npmjs.com/package/pipefy-node)

An unofficial Pipefy API wrapper using node.js.

### Alpha.Beta

This library is in Alpha.Beta stage.

### Under development

Production version will be released in next month, June.

## Official Reference

[Pipefy Apiary](http://docs.pipefy.apiary.io)

## Installation

This library is distributed on `npm`. In order to add it as a dependency,
run the following command:

```sh
    $ npm i -S pipefy-node
```

## Usage

Get the personal access token from Pipefy on this link: https://app.pipefy.com/tokens

```javascript
    var pipefy = require('pipefy-node')({
        accessToken: '<token>',
        logLevel: '<['info', 'warn', 'debug', 'trace']>'
    });
```

## Tests
```sh
    $ npm test
```

