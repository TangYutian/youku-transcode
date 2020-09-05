const transcoder = require('./youku-transcode')
const result = require('./result')

function listFile(req, url, res) {
    const path = url.params.path
    return result.success(path)
}

function transcode(req, url, res) {
    const inputPath = url.params.inputPath
    const outputPath = url.params.outputPath
    const data = transcoder.transcode(inputPath, outputPath)
    return result.success(data)
}

const methods = [
    { 
        mapping: '/files',
        handler: listFile
    },
    {
        mapping: '/transcode',
        handler: transcode
    }
]

module.exports = {
    methods: methods
}