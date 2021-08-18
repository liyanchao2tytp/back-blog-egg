/*
 * @Author: lyc
 * @Date: 2020-10-15 21:02:36
 * @LastEditors: lyc
 * @LastEditTime: 2021-08-18 19:50:36
 * @Description: file content
 */
/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1601697128068_9572';

  // add your middleware config here
  // config.middleware = [ 'jwt' ];
  config.jwt = {
    secret: 'fsd#%#^$sdfewrewq-12648',
  };
  exports.session = {
    key: 'EGG_SESS', // eggjs默认session的key
    maxAge: 24 * 3600 * 1000, // 1 day
    httpOnly: true,
    encrypt: true,
    renew: true, // 每次访问页面都会给session会话延长时间
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: '123456',
      database: 'react-blog',
    },
    app: true,
    agent: false,
  };
  config.security = {
    // 关闭csrf校验机制
    csrf: {
      enable: false,
    },
    domainWhiteList: [ '*' ],
  };

  config.cors = {
    // origin: '*',
    credentials: true, // 运行cookie跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  return {
    ...config,
    ...userConfig,
  };
};
