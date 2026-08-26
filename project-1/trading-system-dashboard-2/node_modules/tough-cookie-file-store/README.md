# tough-cookie-file-store

[![NPM](https://nodei.co/npm/tough-cookie-file-store.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/tough-cookie-file-store/)

A JSON file store implementation for [tough-cookie][0] module

[![Version npm](https://img.shields.io/npm/v/tough-cookie-file-store.svg)](https://www.npmjs.com/package/tough-cookie-file-store)
[![npm Downloads](https://img.shields.io/npm/dw/tough-cookie-file-store.svg)](https://npmcharts.com/compare/tough-cookie-file-store?minimal=true)
[![Tests Status](https://github.com/ivanmarban/tough-cookie-file-store/actions/workflows/tests.yml/badge.svg?branch=master)](https://github.com/ivanmarban/tough-cookie-file-store/actions/workflows/tests.yml)
[![Coverage Status](https://coveralls.io/repos/github/ivanmarban/tough-cookie-file-store/badge.svg?branch=master)](https://coveralls.io/github/ivanmarban/tough-cookie-file-store?branch=master)
[![dependencies Status](https://david-dm.org/ivanmarban/tough-cookie-file-store/status.svg)](https://david-dm.org/ivanmarban/tough-cookie-file-store)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Donate](https://img.shields.io/badge/Donate-PayPal-blue.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=4DELQKMDMDQY4)

## Installation
``` sh
$ npm install tough-cookie-file-store
```

## Usage
``` js
const { CookieJar, Cookie } = require('tough-cookie')
const CookieFileStore = require('tough-cookie-file-store').FileCookieStore
const cookieJar = new CookieJar(new CookieFileStore('./cookie.json'))
const cookie = Cookie.parse('foo=bar; Domain=example.com; Path=/')
cookieJar.setCookie(cookie, 'http://example.com', function (error, cookie) {
  console.log(cookie)
})
```

## License
MIT

[0]: https://github.com/salesforce/tough-cookie
