/*
 * @Author: lyc
 * @Date: 2020-10-20 17:21:42
 * @LastEditors: lyc
 * @LastEditTime: 2021-08-18 19:50:05
 * @Description: file content
 */
'use strict';

module.exports = app => {
  const { router, controller, jwt } = app;

  router.post('/admin/login', controller.admin.main.login);
  router.post('/admin/logout', jwt, controller.admin.main.logout);
  router.get('/admin/getTypeInfo', jwt, controller.admin.main.getTypeInfo);
  router.post('/admin/addArticle', jwt, controller.admin.main.addArticle);
  router.post('/admin/addArticleType', jwt, controller.admin.main.addArticleType);
  router.post('/admin/updateArticle', jwt, controller.admin.main.updateArticle);
  router.get('/admin/getArticleList/:page/:pageSize', jwt, controller.admin.main.getArticleList);
  router.get('/admin/delArticle/:id', jwt, controller.admin.main.delArticle);
  router.get('/admin/getArticleById/:id', jwt, controller.admin.main.getArticleById);
  router.post('/admin/alterPubState/', jwt, controller.admin.main.alterIsPublic);
  router.post('/admin/alterTopState/', jwt, controller.admin.main.alterIsTop);
  router.get('/admin/getRecycleList', jwt, controller.admin.main.getRecycleArticle);
  router.post('/admin/deleteToRecycle', jwt, controller.admin.main.delToRecycle);
};
