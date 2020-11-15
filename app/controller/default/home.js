/*
 * @Author: lyc
 * @Date: 2020-10-20 17:21:42
 * @LastEditors: lyc
 * @LastEditTime: 2020-11-15 11:54:13
 * @Description: file content
 */
'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this
    ctx.body = 'this is sucess'
  }

  async getAriticleList() {
    const { ctx, service } = this
    let page = ctx.params.page
    let pageSize = ctx.params.pageSize
    
    const results = await service.default.article.getListPage(page, pageSize)
 
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
            article.type_id as typeId, 
            article.is_top as is_top, 
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
            article.is_top as is_top,
            FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime, 
            article.view_count as view_count, 
            type.typeName as typeName 
            FROM article LEFT JOIN type ON article.type_id = type.Id 
            WHERE article.type_id=${id} AND article.is_public=1 AND article.is_recycle=0 
            ORDER BY article.is_top DESC, article.addTime DESC 
          `
    const results = await app.mysql.query(sql)
    ctx.body = {
      data: results
    }
  }

  async alterPublicState() {
    const { app, ctx } = this
    let sql = `
     
    `
  }

}

module.exports = HomeController;
