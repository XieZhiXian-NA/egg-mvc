// const app =new (require('koa'))()
// const {initRouter} = require('./kkb-loader')
// //执行以后返回router  router.routes()
// app.use(initRouter().routes())
// app.listen(3000,()=>{
//     console.log('服务器启动在3000端口')
// })

//封装成框架
const kkb = require('./kkb')
const app =new kkb()
app.start(3000)
 