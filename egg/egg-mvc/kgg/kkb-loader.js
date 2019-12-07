const fs= require('fs')
const path = require('path') 
const Router = require('koa-router')
const Sequelize = require('sequelize')
//读文价夹
function load(dir,cb){
    //假设读routes文件夹 url=eggexamples/kgg/routes
    const url = path.resolve(__dirname,dir)
    const files = fs.readdirSync(url)//加载过程 对性能要求不高 可以用同步
    files.forEach(filename =>{
        //去掉文件后缀 没有考虑文件夹
        filename = filename.replace('.js','')
        const file = require(url+'/'+filename)
        cb(filename,file)
    })
}

//初始化路由
function initRouter(app){
    const router = new Router()
    load('routes',(filename,routes)=>{
        //如果filename是‘index' 变换
        console.log('routes:',routes)
        const prefix = filename ==='index' ? '': `/${filename}`
        //routes(app)执行以后他返回的就是一个对象{'get ':{},'get /detail':{}}
        routes = typeof routes ==='function'? routes(app):routes
        console.log('判断routes:',routes)
        Object.keys(routes).forEach(key=>{
            //get /
            const [method,path] = key.split(' ')
             console.log(`正在映射地址:${method.toLocaleUpperCase()} ${prefix} ${path}`)
            //router.get('/user/info',routers.('get /info')//加载对应的方法)
            //router[method](prefix+path,routes[key])
            router[method](prefix+path,async ctx =>{
               //将app传过去  
                app.ctx = ctx
                await routes[key](app)
            })
        })
        //console.log('router',router)
    })
    return router
}

function initController(){
    const controllers = {}
    load('controller',(filename,controller)=>{
         //添加控制器 controller=[index:{},detail:{}]
         console.log('control',filename,controller)
         controllers[filename] = controller
    })
    return controllers
}

function initService(){
    const services = {}
    load('service',(filename,service)=>{
        console.log('service',service)
        services[filename] = service;
    })
    return services
}

function loadConfig(app){
    load('config',(filename,config)=>{
        console.log('config',config)
        if(config.db){
            app.$db = new Sequelize(config.db)
            app.$model = {}
            //加载模型
            load('model',(filename,{schema,options})=>{
                app.$model[filename] = app.$db.define(filename,schema,options)
            })
            app.$db.sync()
        }
        if(config.middleware){
            config.middleware.forEach(middle=>{
                const middlePath = path.resolve(__dirname,'middleware',middle)
                app.$app.use(require(middlePath))
            })
        }
    })
}
const schedule = require('node-schedule')
function initSchedule(){
    load('schedule',(filename,{interval,handler})=>{
        schedule.scheduleJob(interval,handler)
    })
}
module.exports = {initRouter,initController,initService,loadConfig,initSchedule} 