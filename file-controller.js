const trancoder = require('./youku-transcode')
const result = require('./result')

function listFile(req, url, res) {
    const path = url.params.path
    return result.success(path)
}

const methods = [
    { 
        mapping: '/files',
        handler: listFile
    }
]

module.exports = {
    methods: methods
}