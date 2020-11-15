/*
 * @Author: lyc
 * @Date: 2020-11-01 15:21:15
 * @LastEditors: lyc
 * @LastEditTime: 2020-11-14 21:06:24
 * @Description: file content
 */
/*
 * @Author: lyc
 * @Date: 2020-11-01 15:21:15
 * @LastEditors: lyc
 * @LastEditTime: 2020-11-14 17:44:20
 * @Description: file content
 */
'use strict';

const Service = require('egg').Service;
class ArticleService extends Service {
        /**
         * @description: 
         * @param {page}  页码
         * @param {pageSize}  每页的条数
         * @return {article}  文章列表 
         */
        async getListPage(page, pageSize) {
                const { app } = this
                let start = pageSize * (page - 1)
                let end = page * pageSize - 1
                let sql = `
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
                article LEFT JOIN TYPE ON article.type_id = type.Id 
        WHERE 
                article.is_public = 1  AND article.is_recycle=0 
        ORDER BY 
                article.is_top DESC, 
                article.addTime DESC  
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
