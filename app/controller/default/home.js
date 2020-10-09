'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this
    ctx.body = 'this is sucess'
  }

  async getAriticleList() {
    const { app, ctx } = this
    // let id = this.ctx.params.id
    let sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.intro as intro,' +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
      'article.view_count as view_count ,' +
      'type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id '
    // 'WHERE type_id=' + id

    const results = await app.mysql.query(sql)
    ctx.body = { data: results }

  }

  async getAriticleById() {
    const { app, ctx } = this
    let id = ctx.params.id
    let sql = `
        SELECT article.id as id, 
        article.title as title, 
        article.intro as intro, 
        article.article_content as content, 
        FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime, 
        article.view_count as view_count, 
        type.typeName as typeName 
        FROM article LEFT JOIN type ON article.type_id = type.Id 
        WHERE article.id=${id}
    `
    const result = await app.mysql.query(sql)

    ctx.body = { data: result }

  }

  async getTypeInfo() {
    const { ctx, app } = this
    const results = await app.mysql.select('type')
    ctx.body = { data: results }
  }

  async getList() {
    const { app, ctx } = this
    let id = ctx.params.id
    let sql = `
            SELECT article.id as id, 
            article.title as title, 
            article.intro as intro, 
            article.article_content as content, 
            FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime, 
            article.view_count as view_count, 
            type.typeName as typeName 
            FROM article LEFT JOIN type ON article.type_id = type.Id 
            WHERE article.type_id=${id}
          `
    const results = await app.mysql.query(sql)
    ctx.body = {
      data: results
    }
  }

}

module.exports = HomeController;
