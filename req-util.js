function parseUrl(originalUrl){
    const params = {}
    const originalParams = originalUrl.replace(/.*\?/g, '').split(/&/g)
    originalParams.forEach(p => {
        const ps = p.split(/=/)
        params[ps[0]] = decodeURIComponent(ps[1])
    })
    const result = {
        'pathname': originalUrl.replace(/\?.*/g, ''),
        'params': params
    }
    console.log(JSON.stringify(result))
    return result
}

module.exports = {
     parseUrl: parseUrl 
}