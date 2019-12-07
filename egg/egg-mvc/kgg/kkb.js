const Koa = require('koa')
const {initRouter,initController,initService,loadConfig,initSchedule}= require('./kkb-loader')
class kkb{
    constructor(){
        this.$app = new Koa()
        loadConfig(this)
        this.$service = initService()
        this.$ctrl = initController()
        this.$router = initRouter(this)
        this.$app.use(this.$router.routes())
        initService()//计时器任务 定时导出某些数据、定时发送消息或邮件给用户、定时备份什么类型的文件等等
    }
    start(port){
        this.$app.listen(port,()=>{
            console.log(`KKB服务器已在${port}启动`)
        })
    }
}

module.exports = kkb