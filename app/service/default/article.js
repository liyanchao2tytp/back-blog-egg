/*
 * @Author: lyc
 * @Date: 2020-11-01 15:21:15
 * @LastEditors: lyc
 * @LastEditTime: 2021-08-15 15:51:02
 * @Description: file content
 */

'use strict';

const Service = require('egg').Service;
class ArticleService extends Service {
  // eslint-disable-next-line jsdoc/check-param-names
  /**
	 * @description: 首页 获取所有文章
	 * @param {page}  页码
	 * @param {pageSize}  每页的条数
	 * @return {article}  文章列表
	 */
  async getListPage(page, pageSize) {
    const { app } = this;
    const start = pageSize * (page - 1);
    const end = page * pageSize - 1;
    const sql = `
				SELECT  
								article.id AS id,
								article.title AS title, 
								article.intro AS intro, 
								FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) AS addTime,
								article.view_count AS view_count ,
								article.is_public AS is_public,
								article.is_top AS is_top,
								type.typeName AS typeName 
				FROM 
								article LEFT JOIN type ON article.type_id = type.Id 
				WHERE 
								article.is_public = 1  AND article.is_recycle=0 
				ORDER BY 
								article.is_top DESC, 
								article.addTime DESC  
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

  // eslint-disable-next-line jsdoc/check-param-names
  /**
	 * @description: 列表页(list) 根据type_id获取所有文章
	 * @param {id} type_id
	 * @param {page} 第几页
	 * @param {pageSize} 每页大小
	 * @return {querySet} 查询出的第一页的结果集
	 */
  async getTypeList(id, page, pageSize) {
    const { app } = this;
    const start = pageSize * (page - 1);
    const end = page * pageSize - 1;
    const sql = `
            SELECT article.id as id, 
            article.title as title, 
            article.intro as intro, 
            article.article_content as content, 
            article.is_top as is_top,
            FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime, 
            article.view_count as view_count, 
            type.typeName as typeName 
            FROM article LEFT JOIN type ON article.type_id = type.Id 
            WHERE article.type_id=? AND article.is_public=1 AND article.is_recycle=0 
						ORDER BY article.is_top DESC, article.addTime DESC 
						LIMIT ?,?
					`;
    const sql_num = `
					SELECT 
									COUNT(*) AS total
					FROM 
									article LEFT JOIN type ON article.type_id = type.Id 
					WHERE 
									article.type_id=? 
							AND article.is_public=1 
							AND article.is_recycle=0 

			`;
    const article = await app.mysql.query(sql, [ id, start, end ]);
    const num = await app.mysql.query(sql_num, id);
    return {
      num,
      article,
    };
  }

  async getArticleById(glueSql) {
    const { app } = this;
    const sql = `
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
        ${glueSql}
		`;
    return app.mysql.query(sql);

  }
}

module.exports = ArticleService;
