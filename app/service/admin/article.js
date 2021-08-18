/*
 * @Author: lyc
 * @Date: 2020-11-14 21:01:51
 * @LastEditors: lyc
 * @LastEditTime: 2021-08-15 15:50:24
 * @Description: file content */
'use strict';

const Service = require('egg').Service;

class ArticleService extends Service {
  async checkLogin(usrName, passWord) {
    const { app } = this;
    const sql = `
        SELECT * FROM admin_user WHERE userName=? AND password = ?
      `;
    return app.mysql.query(sql, [ usrName, passWord ]);
  }
  async getArticleList(page, pageSize) {
    const { app } = this;
    const start = pageSize * (page - 1);
    const end = page * pageSize - 1;
    const sql = `
        SELECT 
                  article.id as id, 
                  article.title as title, 
                  article.is_public as is_public,
                  article.is_top as is_top,
                  FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime, 
                  article.view_count as view_count, 
                  type.typeName as typeName 
        FROM 
                  article LEFT JOIN type ON article.type_id = type.Id  
        WHERE 
                  article.is_recycle = 0   
        ORDER BY  
                  article.is_top DESC,    
                  article.id DESC
        LIMIT ?,?
    `;

    const sql_num = `
    SELECT
          count(*) AS total
    FROM
          article 
    WHERE 
          article.is_public = 1  AND article.is_recycle=0
`;
    const article = await app.mysql.query(sql, [ start, end ]);
    const num = await app.mysql.query(sql_num);
    return {
      article,
      num,
    };
  }
  async getArticleById(id) {
    const { app } = this;
    const sql = `
          SELECT article.id as id, 
              article.title as title, 
              article.intro as intro, 
              article.is_top as is_top,
              article.is_public as is_public,
              article.article_content as content, 
              FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime, 
              article.view_count as view_count , 
              type.typeName as typeName , 
              type.id as typeId 
          FROM article LEFT JOIN type ON article.type_id = type.id 
          WHERE article.id= ?  
    `;
    return app.mysql.query(sql, [ id ]);
  }
  async getRecycleList() {
    const { app } = this;
    const sql = `
        SELECT article.id as id, 
            article.title as title, 
            article.is_public as is_public,
            FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,  
            article.view_count as view_count, 
            FROM_UNIXTIME(article.delTime,'%Y-%m-%d %H:%i:%s' ) as delTime, 
            type.typeName as typeName 
        FROM article LEFT JOIN type ON article.type_id = type.Id  
        WHERE article.is_recycle=1 
        ORDER BY article.delTime DESC
    `;
    return app.mysql.query(sql);
  }
  async getTopImg() {
    const { app } = this;
    const sql = `
        SELECT id,article_content
        FROM article
        ORDER BY article.addTime DESC
        LIMIT 1,4
    `;
    return app.mysql.query(sql);
  }
  // async addArticleType() { }
}

module.exports = ArticleService;
