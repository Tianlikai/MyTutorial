# 求助

需求：

拿到文件的七牛地址（类似于：https://lcdns-pic.learnta.com/Fm01lUytIrlG9qhw5cYnIxRO3Nzz）

实现前端下载文件。
并且可以重命名文件（文件名重事先从后端拿到），兼容主流游览器包括 移动端和微信

问题：

* 兼容性问题

* 手机预览文件时，出现‘.txt’ 文件乱码

* 预览文件首次成功，刷新游览器即抛出 WebkitBlobRessource error 1

* 部分安卓手机和微信中打开直接报错


## 我的兼容性有问题的代码

此段代码在web端可以实现兼容性下载

但是在手机游览器中会存在刷新游览器即抛出 WebkitBlobRessource error 1

在微信游览器和部分安卓手机自带游览器中直接报错

```
    const initXMLhttp = () => {
        var xmlhttp
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest()
        } else {
            xmlhttp = new ActiveXObject('Microsoft.XMLHTTP')
        }
        return xmlhttp
    }

    /**
    * 获取 blob
    * @param  {String} url 目标文件地址
    * @return {Promise}
    */
    function getBlob(url) {
        return new Promise(resolve => {
            // const xhr = new XMLHttpRequest()
            const xhr = initXMLhttp()
            xhr.open('GET', url, true)
            xhr.responseType = 'blob'
            xhr.onload = () => {
                if (xhr.status === 200) {
                    resolve(xhr.response)
                }
            }

            xhr.send()
        })
    }

    /**
    * 保存
    * @param  {Blob} blob
    * @param  {String} filename 想要保存的文件名称
    */
    function saveAs(blob, filename) {
        if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, filename)
        } else {
            const link = document.createElement('a')
            const body = document.querySelector('body')
            if (filename.indexOf('.txt') >= 0) {
                link.href = window.URL.createObjectURL(
                    new Blob(['\uFEFF', blob], { type: 'text/plain;charset=utf-8' })
                )
            } else {
                link.href = window.URL.createObjectURL(blob)
            }
            link.download = filename

            // fix Firefox
            link.style.display = 'none'
            body.appendChild(link)

            link.click()
            body.removeChild(link)

            window.URL.revokeObjectURL(link.href)
        }
    }

    /**
    * 下载
    * @param  {String} url 目标文件地址
    * @param  {String} filename 想要保存的文件名称
    */
    function download(url, filename) {
        getBlob(url).then(blob => {
            saveAs(blob, filename)
        })
    }

```

### 大家如有踩过此坑，请给小弟分享一下
