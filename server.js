const http = require('http')
const server = http.createServer()

const controllers = [
    require('./file-controller')
]
const reqUtil = require('./req-util')
const result = require('./result')

const methods = {}
server.listen(3000, 'localhost', () => {
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
    res.end(JSON.stringify(ret))
})
