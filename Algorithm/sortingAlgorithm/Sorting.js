class Sorting {
    /**
     * 插入排序 升序排列 大的数往右挪
     * 对于i 的左侧 [0 ,i - 1] 是一个排好序的数组
     * 对于i 的右侧 [i + 1, n] 是等待插入的元素
     * @param {*} data 
     * @returns {void}
     */
    insertionSortByAsc (data) {
        if (this.getType(data) !== 'array' || data.length <= 1) return data
        for(let i = 1; i < data.length; i += 1) {
            let value = data[i]
            let j = i - 1
            while(j >= 0 && data[j] > value) {
                let temp = data[j + 1]
                data[j + 1] = data[j]
                data[j] = temp
                j -= 1
            }
            data[j + 1] = value
        }
    }

    /**
     * 插入排序 降序排列 小的数往右挪
     * @param {*} data 
     */
    insertionSortByDesc (data) {
        if (this.getType(data) !== 'array' || data.length <= 1) return data
        for(let i = 1; i < data.length; i += 1) {
            let value = data[i]
            let j = i - 1
            while(j >= 0 && data[j] < value) {
                let temp = data[j + 1]
                data[j + 1] = data[j]
                data[j] = temp
                j -= 1
            }
            data[j + 1] = value
        }
    }

    getType(target){
        return Object.prototype.toString.call(target).slice(8, -1).toLocaleLowerCase()
    }
}

let data = [31, 41, 59, 26, 41, 58];

let sort = new Sorting()
sort.insertionSortByDesc(data)
console.log(data)

