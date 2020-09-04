const http = require('http')
const server = http.createServer()

const methods = {
    '/files': getFileList
}

server.listen(3000, 'localhost', () => {
    console.log("server is listening on port 3000 ")
})

server.on('request', (req, res) => {
    let result = {
        'status': 0,
        'msg': {} 
    }
    const url = parseUrl(req.url)
    const method = methods[url.pathname]
    if(method != null || method != undefined){
       result =  method(req, url, res)
    }
    res.end(JSON.stringify(result))
})

function parseUrl(originalUrl){
    const params = {}
    const originalParams = originalUrl.replace(/.*\?/g, '').split(/&/g)
    originalParams.forEach(p => {
        const ps = p.split(/=/)
        params[ps[0]] = ps[1]
    })
    const result = {
        'pathname': originalUrl.replace(/\?.*/g, ''),
        'params': params
    }
    console.log(JSON.stringify(result))
    return result
}

function getFileList(req, url, res) {
    const result = {
        'status': 0,
        'msg': 'success',
        'data': {}
    }
    const params = url.params
    data = {
        'a': params.a,
        'b': params.b
    }
    result.data = data
    return result
}