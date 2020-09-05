const http = require('http')

const controllers = [
    require('./file-controller')
]
const reqUtil = require('./req-util')
const result = require('./result')
const methods = {}

const server = http.createServer((req, res) => {
 // 开发环境设置，生产环境谨慎使用
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
 res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
}).listen(3000, 'localhost', () => {
    console.log('server is listening on port 3000 ')
    controllers.forEach(
        controller => {
            controller.methods.forEach(method => {
            console.log('mapping: ' + method.mapping)
            methods[method.mapping] = method.handler
        })
    })
})

server.on('request', (req, res) => {
    ret = result.success(null)
    const url = reqUtil.parseUrl(req.url)
    const method = methods[url.pathname]
    if(method != null || method != undefined){
       ret =  method(req, url, res)
    }
    const data = JSON.stringify(ret)
    console.log(data)
    res.end(data)
})
