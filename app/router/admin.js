/*
 * @Author: lyc
 * @Date: 2020-10-20 17:21:42
 * @LastEditors: lyc
 * @LastEditTime: 2021-08-17 10:55:42
 * @Description: file content
 */
'use strict';

require('../middleware/adminauth');

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const adminauth = app.middleware.adminauth();
  // router.post('/admin/login', controller.admin.main.login);
  // router.post('/admin/logout', controller.admin.main.logout);
  // router.get('/admin/getTypeInfo', controller.admin.main.getTypeInfo);
  // router.post('/admin/addArticle', controller.admin.main.addArticle);
  // router.post('/admin/addArticleType', controller.admin.main.addArticleType);
  // router.post('/admin/updateArticle', controller.admin.main.updateArticle);
  // router.get('/admin/getArticleList/:page/:pageSize', controller.admin.main.getArticleList);
  // router.get('/admin/delArticle/:id', controller.admin.main.delArticle);
  // router.get('/admin/getArticleById/:id', controller.admin.main.getArticleById);
  // router.post('/admin/alterPubState/', controller.admin.main.alterIsPublic);
  // router.post('/admin/alterTopState/', controller.admin.main.alterIsTop);
  // router.get('/admin/getRecycleList', controller.admin.main.getRecycleArticle);
  // router.post('/admin/deleteToRecycle', controller.admin.main.delToRecycle);


  router.post('/admin/login', controller.admin.main.login);
  router.post('/admin/logout', adminauth, controller.admin.main.logout);
  router.get('/admin/getTypeInfo', adminauth, controller.admin.main.getTypeInfo);
  router.post('/admin/addArticle', adminauth, controller.admin.main.addArticle);
  router.post('/admin/addArticleType', adminauth, controller.admin.main.addArticleType);
  router.post('/admin/updateArticle', adminauth, controller.admin.main.updateArticle);
  router.get('/admin/getArticleList/:page/:pageSize', adminauth, controller.admin.main.getArticleList);
  router.get('/admin/delArticle/:id', adminauth, controller.admin.main.delArticle);
  router.get('/admin/getArticleById/:id', adminauth, controller.admin.main.getArticleById);
  router.post('/admin/alterPubState/', adminauth, controller.admin.main.alterIsPublic);
  router.post('/admin/alterTopState/', adminauth, controller.admin.main.alterIsTop);
  router.get('/admin/getRecycleList', adminauth, controller.admin.main.getRecycleArticle);
  router.post('/admin/deleteToRecycle', adminauth, controller.admin.main.delToRecycle);
};
