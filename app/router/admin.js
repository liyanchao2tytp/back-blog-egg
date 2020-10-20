'use strict';

const adminauth = require("../middleware/adminauth");

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  const adminauth = app.middleware.adminauth()
  // router.post('/admin/login', controller.admin.main.login)
  // router.get('/admin/getTypeInfo', controller.admin.main.getTypeInfo)
  // router.post('/admin/addArticle', controller.admin.main.addArticle)
  // router.post('/admin/updateArticle',controller.admin.main.updateArticle)
  // router.get('/admin/getArticleList',controller.admin.main.getArticleList)
  // router.get('/admin/delArticle/:id',controller.admin.main.delArticle)
  // router.get('/admin/getArticleById/:id',controller.admin.main.getArticleById)
  // router.post('/admin/alterPubState/',controller.admin.main.alterIsPublic)

  router.post('/admin/login', controller.admin.main.login)
  router.get('/admin/getTypeInfo', adminauth, controller.admin.main.getTypeInfo)
  router.post('/admin/addArticle', adminauth, controller.admin.main.addArticle)
  router.post('/admin/updateArticle',adminauth,controller.admin.main.updateArticle)
  router.get('/admin/getArticleList',adminauth,controller.admin.main.getArticleList)
  router.get('/admin/delArticle/:id',adminauth,controller.admin.main.delArticle)
  router.get('/admin/getArticleById/:id',adminauth,controller.admin.main.getArticleById)
  router.post('/admin/alterPubState/',adminauth,controller.admin.main.alterIsPublic)
  router.post('/admin/alterTopState/',adminauth,controller.admin.main.alterIsTop)
  router.get('/admin/getRecycleList',adminauth,controller.admin.main.getRecycleArticle)
  router.post('/admin/deleteToRecycle',adminauth,controller.admin.main.delToRecycle)
}