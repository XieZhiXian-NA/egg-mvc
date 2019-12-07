module.exports = app =>({
    // 'get /':async ctx =>{
    //     ctx.body = '首页'
    // },
    // 'get /detail':ctx=>{
    //   ctx.body =  '详情'
    // }
    'get /' :app.$ctrl.home.index,
    'get /detail':app.$ctrl.home.detail
})
//return ({})返回了一个方法