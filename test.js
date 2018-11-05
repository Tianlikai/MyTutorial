var a = 1539683760377
var b = new Date().getTime()
var c = a - b
console.log(c)


weShare = data => {
    let params = { title: '论答商务合作', imgUrl: imgUrl, ...data }
    G.wechatShare(params)
}


componentDidMount() {
    const { pathname } = window.location
    const link
        = __TARGET__ === 'dev'
            ? `https://demo.learnta.cn/bd${pathname}`
            : `https://learnta.cn/bd${pathname}`
    this.weShare({
        desc: link,
        link: link
    })
}




const { pathname } = window.location
const linkWeShare
    = __TARGET__ === 'dev'
        ? `https://demo.learnta.cn/bd${pathname}`
        : `https://learnta.cn/bd${pathname}`
this.weShare({
    desc: manualTitle,
    link: linkWeShare
})


componentDidMount() {
    const { query, id, app } = this.getUrlParams(this.props)
    this.props[store].searchManuals(id, query, app)
    const link
        = __TARGET__ === 'dev'
            ? 'https://demo.learnta.cn/bd/outer/detail'
            : 'https://learnta.cn/outer/detail'
    this.weShare({
        desc: link,
        link: link
    })
}