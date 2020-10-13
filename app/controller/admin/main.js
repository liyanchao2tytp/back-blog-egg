'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller {
  async login() {
    const { app, ctx } = this
    let userName = ctx.request.body.userName
    let passWord = ctx.request.body.passWord

    const sql = `
        SELECT * FROM admin_user WHERE userName='${userName}' AND password = '${passWord}'
      `
    const res = await app.mysql.query(sql)
    
    if (res.length > 0) {
      let openId = new Date().getTime()
      ctx.session.openId = { 'openId': openId }
      ctx.body = { 'message': '登陆成功', 'openId': openId }
    } else {
      ctx.body = { 'message': '登陆失败' }
    }

  }

  async getTypeInfo() {
    const {app,ctx} = this
    const resType = await app.mysql.select('type')
    ctx.body = {data:resType }
  }

}

module.exports = MainController;
