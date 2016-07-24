# plover-assets-util


[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]


资源编译相关工具类

## Installing

```sh
npm install --save plover-assets-util
```

## List
### template
字符串模版格式化。

##### 参数

| name | description |
|------|-------------|
| pattern | 字符串模版，以`{}`格式的模版 |
| data | 填充模版的数据 |

e.g.

```js
const util = require('plover-assets-util');

const data = {
  name: 'common',
  path: 'js/bridge.js'
};

let url = '/g/{name}/{path}';

url = util.template(url, data);  // "/g/common/js/bridge.js"
```

## scanDir
根据一定规则扫描目录文件。

##### 参数

| name | description |
|------|-------------|
| dir | 待扫描的目录 |
| options | 可选项 |

e.g.

```js
const pathUtil = require('path');
const util = require('plover-assets-util');

const dir = pathUtil.join(__dirname, 'common');
const paths = util.scanDir(dir, {
  match: [''],
  ignore: [''],
  relative: ''
});
```

## hashDir
获取一个目录的**hash**值。

##### 参数

| name | description |
|------|-------------|
| dir | 待计算**hash**值的目录 |
| options | 可选项 |

e.g.

```js
const pathUtil = require('path');
const util = require('plover-assets-util');

const dir = pathUtil.join(__dirname, 'common');
const hashcode = util.hashDir(dir, {
  salt: ''
});
```


[npm-image]: https://img.shields.io/npm/v/plover-assets-util.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/plover-assets-util
[travis-image]: https://img.shields.io/travis/plover-modules/plover-assets-util/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/plover-modules/plover-assets-util
[coveralls-image]: https://img.shields.io/codecov/c/github/plover-modules/plover-assets-util.svg?style=flat-square
[coveralls-url]: https://codecov.io/github/plover-modules/plover-assets-util?branch=master

