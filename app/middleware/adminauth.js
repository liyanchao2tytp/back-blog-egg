/*
 * @Author: lyc
 * @Date: 2020-10-15 21:02:36
 * @LastEditors: lyc
 * @LastEditTime: 2021-08-18 17:34:21
 * @Description: file content
 */
'use strict';
module.exports = () => {
  return async function adminauth(ctx, next) {
    //   console.log(ctx.session.openId)
    // if(ctx.url === '/admin/login'){
    //   await next()
    // }else
    if (ctx.session.openId) {
      await next();
    } else {
      ctx.body = { message: '没有登录' };
    }
  };
};
