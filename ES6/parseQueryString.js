function parseQueryString(url) {
    if (!url || typeof url !== 'string') return '格式错误'
    let str = url.split('?')[1]
    if (!str) return 'url 无参数'
    let params = {}    
    let paramsArray = str.split('&')
    paramsArray.forEach(ele => {
        let p = ele.split('=')
        params[p[0]] = p[1]
    })
    return params
}