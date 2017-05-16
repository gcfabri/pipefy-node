# pipefy-node

[![npm version](https://badge.fury.io/js/pipefy-node.svg)](https://badge.fury.io/js/pipefy-node)
[![Build Status](https://travis-ci.org/travis-ci/travis-web.svg?branch=master)](https://travis-ci.org/travis-ci/travis-web)
[![Coverage Status](https://coveralls.io/repos/github/gcfabri/pipefy-node/badge.svg?branch=master)](https://coveralls.io/github/gcfabri/pipefy-node?branch=master)

An unofficial Pipefy API wrapper using node.js

### Alpha

This library is in Alpha.

## Official Reference

[Pipefy Apiary](http://docs.pipefy.apiary.io)

## Installation

This library is distributed on `npm`. In order to add it as a dependency,
run the following command:

```sh
    $ npm i -S pipefy-node
```

## Usage

```javascript
    var pipefy = new(require('pipefy-node'))({
        'your_personal_access_token': '<token>'
    });
```

## Tests

    `npm test`


