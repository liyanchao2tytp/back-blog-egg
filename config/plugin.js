/*
 * @Author: lyc
 * @Date: 2020-10-03 20:45:30
 * @LastEditors: lyc
 * @LastEditTime: 2021-08-15 15:51:20
 * @Description: file content
 */
'use strict';

/** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // }
// };


module.exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};

// eslint-disable-next-line eggache/no-override-exports
exports.cors = {
  enable: true,
  package: 'egg-cors',
};
