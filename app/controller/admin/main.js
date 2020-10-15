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
    const { app, ctx } = this
    const resType = await app.mysql.select('type')
    ctx.body = { data: resType }
  }


  async addArticle() {
    const { app, ctx } = this
    const tempArticle = ctx.request.body
    const result = await app.mysql.insert('article', tempArticle)
    console.log(result)
    const insertSuccess = result.affectedRows === 1
    const insertId = result.insertId
    console.log(insertSuccess)
    ctx.body = {
      isOk: insertSuccess,
      insertId: insertId
    }

  }

  async updateArticle() {
    const { app, ctx } = this
    let tempArticle = ctx.request.body

    const result = await app.mysql.update('article', tempArticle)
    console.log(result)
    const updateSuccess = result.affectedRows === 1
    console.log(updateSuccess)
    ctx.body = {
      isOk: updateSuccess
    }
  }

  async getArticleList() {
    const { app, ctx } = this
    let sql = `
        SELECT article.id as id, 
            article.title as title, 
            article.intro as intro, 
            article.article_content as content, 
            FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime, 
            article.view_count as view_count, 
            type.typeName as typeName 
            FROM article LEFT JOIN type ON article.type_id = type.Id  
            ORDER BY article.id DESC
    `
    const resultList = await app.mysql.query(sql)
    ctx.body = {
      articleList: resultList
    }

  }

  async delArticle() {
    const { app, ctx } = this
    let id = ctx.params.id
    const res = await app.mysql.delete('article',{'id':id})
    ctx.body = {
      data:res
    }
  }

  async getArticleById(){
    const {app,ctx} = this
    let id = ctx.params.id
    let sql = `
    SELECT article.id as id, 
        article.title as title, 
        article.intro as intro, 
        article.article_content as content, 
        FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime, 
        article.view_count as view_count , 
        type.typeName as typeName , 
        type.id as typeId 
    FROM article LEFT JOIN type ON article.type_id = type.id 
    WHERE article.id= ${id}
    `
    const result = await app.mysql.query(sql)
    console.log(result)
    ctx.body={
      data:result
    }
  }

}

module.exports = MainController;
