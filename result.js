success = function success(data) {
    return {
        'status': 200,
        'msg': 'success',
        'data': data
    }
}

function error() {
    return {
        'status': 500,
        'msg': 'error'
    }
}

function errorWithMsg(msg){
    return {
        'status': 500,
        'msg': msg,
    }
}

module.exports = {
    success : success,
    error : error,
    errorWithMsg : errorWithMsg
}