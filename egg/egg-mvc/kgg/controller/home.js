module.exports = {
    // index: async ctx =>{
    //     ctx.body = '首页 ctx'
    // },
    // detail: async ctx =>{
    //     ctx.body = '详细页面ctr'
    // }
    index:async app =>{
        // console.log('执行home,index')
        // const name = await app.$service.user.getName()
        app.ctx.body = await app.$model.user.findAll()
    },
    detail: app=>{
        app.ctx.body = '详情页面'
    }
}