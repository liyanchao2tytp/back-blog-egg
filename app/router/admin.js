'use strict';

const adminauth = require("../middleware/adminauth");

module.exports = app => {
  const { router, controller } = app
  const adminauth = app.middleware.adminauth()
  router.post('/admin/login',controller.admin.main.login)
  router.get('/admin/getTypeInfo',adminauth,controller.admin.main.getTypeInfo)
}