const fs = require('fs')
const path = require('path')
const exec = require('child_process').exec

const ffmpeg = path.normalize(__dirname + '/nplayer/ffmpeg.exe')

/**
 * 组装转码命令
 * @param input 输入文件
 * @param output 输出文件
 */
function getCmd(input, output){
    return ffmpeg + ' -y -i ' + input + ' -c:v copy -c:a copy -threads 2 ' + output
}

/**
 * 转码一个文件，如果成功返回true，否则返回false
 * @param file 文件名
 * @param inputPath 输入路径，不允许有空格
 * @param outputPath 输出路径，不允许有空格
 */
function transcodeFile(file, inputPath, outputPath){
    if(file.match(/\s/)){
        file = "\"" + file + "\""
    }
    const input = inputPath + '/' + file
    // .kux 后缀换成 .mp4
    const output = outputPath + '/' + file.replace(/\.*$/g, '.mp4')
    if(inputPath.match(/\s/) || outputPath.match(/\s/)){
        return false
    }
    exec(getCmd(input, output), (error, stdout, stderr) => {
        if (error) {
            console.log('error: ' + stderr)
        }
        else {
            console.log(output + stdout)
        }
    })
    return true
}

/**
 * 转码一个目录下的视频，返回转码结果
 * @param inputPath 要转码的视频所在的目录，不允许有空格
 * @param outputPath 要保存视频的目录，不允许有空格
 */
function transcode(inputPath, outputPath) {
    const files = fs.readdirSync(inputPath)
    const result = {
        success: [],
        error: []
    }
    files.forEach(file => {
        const success = transcodeFile(file, inputPath, outputPath)
        if(success){
            console.log(file, 'transcode successfully')
            result.success.push(file)
        } else {
            console.log(file, 'transcode failed')
            result.error.push(file)
        }
    })
    return result
}

module.exports = {
    transcode: transcode
}
