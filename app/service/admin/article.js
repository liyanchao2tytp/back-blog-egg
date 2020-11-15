/*
 * @Author: lyc
 * @Date: 2020-11-14 21:01:51
 * @LastEditors: lyc
 * @LastEditTime: 2020-11-14 21:21:19
 * @Description: file content
 */
'use strict';

const Service = require('egg').Service;

class ArticleService extends Service {
  async getArticleList(page, pageSize) {
    const { app } = this
    let start = pageSize * (page - 1)
    let end = page * pageSize - 1
    let sql = `
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
    `

    let sql_num = `
    SELECT
          count(*) AS total
    FROM
          article 
    WHERE 
          article.is_public = 1  AND article.is_recycle=0
`
    const article = await app.mysql.query(sql, [start, end])
    const num = await app.mysql.query(sql_num)
    return {
      article: article,
      num: num
    }
  }
}

module.exports = ArticleService;
