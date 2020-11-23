/*
 * @Author: lyc
 * @Date: 2020-10-03 20:45:30
 * @LastEditors: lyc
 * @LastEditTime: 2020-11-21 19:57:59
 * @Description: file content
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  router.get('/', controller.default.home.index)
  router.get('/getlist/:page/:pageSize', controller.default.home.getAriticleList)
  router.get('/getById', controller.default.home.getAriticleById)
  router.get('/getById/:id', controller.default.home.getAriticleById)
  router.get('/getType', controller.default.home.getTypeInfo)
  router.get('/getAlist/:id/:page/:pageSize', controller.default.home.getList)
}

