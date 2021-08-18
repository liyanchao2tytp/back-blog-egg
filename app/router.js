/*
 * @Author: lyc
 * @Date: 2020-10-15 21:02:36
 * @LastEditors: lyc
 * @LastEditTime: 2021-08-15 15:51:05
 * @Description: file content
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./router/default')(app);
  require('./router/admin')(app);
};
