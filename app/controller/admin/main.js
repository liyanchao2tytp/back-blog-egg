'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller {
  async login() {
    const { ctx, service } = this;
    const userName = ctx.request.body.userName;
    const passWord = ctx.request.body.passWord;
    const res = await service.admin.article.checkLogin(userName, passWord);
    if (res.length > 0) {
      const openId = new Date().getTime();
      ctx.session.openId = openId;
      ctx.body = { message: '登陆成功', openId };
    } else {
      ctx.body = { message: '登陆失败' };
    }
  }
  async logout() {
    const { ctx } = this;
    ctx.session = null;
    ctx.body = { message: '登出成功' };
  }

  async getTypeInfo() {
    const { app, ctx } = this;
    const resType = await app.mysql.select('type');
    ctx.body = { data: resType };
  }


  async addArticle() {
    const { app, ctx } = this;
    const tempArticle = ctx.request.body;
    console.log(tempArticle);
    const result = await app.mysql.insert('article', tempArticle);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;
    ctx.body = {
      isOk: insertSuccess,
      insertId,
    };

  }

  async addArticleType() {
    const { app, ctx } = this;
    const type = ctx.request.body;
    const result = await app.mysql.insert('type', type);
    const insertSuccess = result.affectedRows === 1;
    ctx.body = {
      isOk: insertSuccess,
    };
  }

  async updateArticle() {
    const { app, ctx } = this;
    const tempArticle = ctx.request.body;

    const result = await app.mysql.update('article', tempArticle);
    const updateSuccess = result.affectedRows === 1;
    ctx.body = {
      isOk: updateSuccess,
    };
  }

  async getArticleList() {
    const { ctx, service } = this;
    const page = ctx.params.page === 0 ? 1 : ctx.params.page;
    const pageSize = ctx.params.pageSize;

    const results = await service.admin.article.getArticleList(page, pageSize);

    ctx.body = { data: results };
  }


  async delArticle() {
    const { app, ctx } = this;
    const id = ctx.params.id;
    const res = await app.mysql.delete('article', { id });
    ctx.body = {
      data: res,
    };
  }


  async getArticleById() {
    const { service, ctx } = this;
    const id = ctx.params.id;

    const result = await service.admin.article.getArticleById(id);
    console.log(result);
    ctx.body = {
      data: result,
    };
  }

  async alterIsPublic() {
    const { app, ctx } = this;
    const id = ctx.request.body.id;
    const yes_no_public = ctx.request.body.yn_public;
    const row = {
      id,
      is_public: yes_no_public,
    };

    const result = await app.mysql.update('article', row);
    const isSuccess = result.affectedRows === 1;
    ctx.body = {
      isOk: isSuccess,
    };
  }

  async alterIsTop() {
    const { app, ctx } = this;
    const id = ctx.request.body.id;
    const yes_no_top = ctx.request.body.yn_top;
    const row = {
      id,
      is_top: yes_no_top,
    };

    const result = await app.mysql.update('article', row);
    const isSuccess = result.affectedRows === 1;
    ctx.body = {
      isOk: isSuccess,
    };
  }


  async getRecycleArticle() {
    const { service, ctx } = this;

    const resultList = await service.admin.article.getRecycleList();
    ctx.body = {
      articleList: resultList,
    };
  }

  async delToRecycle() {
    const { app, ctx } = this;
    const id = ctx.request.body.id;
    const yes_no = ctx.request.body.yn_goto_recycle;
    const delTime = ctx.request.body.time;
    const row = {
      id,
      is_recycle: yes_no,
      delTime,
    };

    const result = await app.mysql.update('article', row);
    const isSuccess = result.affectedRows === 1;
    ctx.body = {
      isOk: isSuccess,
    };
  }

  async getIndexImg() {
    const { service } = this;
    // 获取前五条发布的文章
    const imgList = await service.admin.article.getTopImg();
    // 正则匹配前五条发布的文章内容图片
    const reg = /\!\[.*\]\(.+\)/;
    imgList.map(v => {
      return reg.exec(v.article_content);
    });
  }
}

module.exports = MainController;
