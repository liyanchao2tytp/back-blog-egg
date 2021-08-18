/*
 * @Author: lyc
 * @Date: 2020-10-20 17:21:42
 * @LastEditors: lyc
 * @LastEditTime: 2021-08-15 15:47:44
 * @Description: file content
 */
'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'this is sucess';
  }

  async getAriticleList() {
    const { ctx, service } = this;
    const page = ctx.params.page;
    const pageSize = ctx.params.pageSize;

    const results = await service.default.article.getListPage(page, pageSize);

    ctx.body = { data: results };
  }

  async getAriticleById() {
    const { service, ctx } = this;
    let glueSql = '';
    const id = ctx.params.id;
    id ? glueSql = `WHERE article.id = ${id}` : '';
    const result = await service.default.article.getArticleById(glueSql);

    ctx.body = { data: result };

  }

  async getTypeInfo() {
    const { ctx, app } = this;
    const results = await app.mysql.select('type');
    ctx.body = { data: results };
  }

  async getList() {
    const { service, ctx } = this;
    const id = ctx.params.id;
    const page = ctx.params.page;
    const pageSize = ctx.params.pageSize;
    const results = await service.default.article.getTypeList(id, page, pageSize);
    ctx.body = {
      data: results,
    };
  }

  async alterPublicState() {
    // const { app, ctx } = this;
  }

}

module.exports = HomeController;
