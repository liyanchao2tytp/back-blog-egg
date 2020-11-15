'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  router.get('/', controller.default.home.index)
  router.get('/getlist/:page/:pageSize',controller.default.home.getAriticleList)
  router.get('/getById/:id',controller.default.home.getAriticleById)
  router.get('/getType',controller.default.home.getTypeInfo)
  router.get('/getAlist/:id',controller.default.home.getList)
}

