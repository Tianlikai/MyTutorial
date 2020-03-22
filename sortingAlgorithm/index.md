# 排序算法

生成 n 个 1-n 的整数，存放到数组中，后文中的`data`代表的就是数据集

```javascript
function dataGenerator(n) {
  const data = [];
  for (let i = 0; i < n; i += 1) {
    data.push(Math.floor(Math.random() * n) + 1);
  }
  return data;
}
```

## 冒泡排序

（升序）外层循环从`p=data.length - 1`开始，递减到 1。内层循环从下标为`i=0`开始，对相邻元素进行比较，直到不满足`i < p`，如果`data[i]大于data[i+1]`那么对相邻的元素进行位置交换，经过一趟冒泡后最大的元素就到了数据集的最右侧。

```javascript
function bubble_sort1(data) {
  for (let p = data.length - 1; p >= 1; p -= 1) {
    for (let i = 0; i < p; i += 1) {
      if (data[i] > data[i + 1]) {
        const temp = data[i + 1];
        data[i + 1] = data[i];
        data[i] = temp;
      }
    }
  }
  return data;
}
```

`优化，如果一次内层循环中没有发生过交换，则说明data已经有序`

```javascript
function bubble_sort2(data) {
  for (let p = data.length - 1; p > 1; p -= 1) {
    let flag = 0;
    for (let i = 0; i < p; i += 1) {
      if (data[i] > data[i + 1]) {
        const temp = data[i + 1];
        data[i + 1] = data[i];
        data[i] = temp;
        flag = 1;
      }
    }
    if (flag === 0) break; /** 全程无交换，已经有序 */
  }
  return data;
}
```

时间复杂度

| 情况             | 时间复杂度      | 是否稳定 |
| ---------------- | --------------- | -------- |
| 最好（已经有序） | T = O\(N\)      | 稳定     |
| 最坏（逆序）     | T = O\(N \* N\) | 稳定     |

## 插入排序

（升序）插入排序的过程就像是抓一手牌，手里的牌是有序的，拿到一张新牌依次从右向左比较（从大往小），如果拿到的新牌小于比较的牌，就把比较的牌往右边移一位，直到找到牌的位置进行插入。

```javascript
function intersection_sort(data) {
  for (let p = 1; p < data.length; p += 1) {
    const newCard = data[p]; /** 拿到一张新牌,第一张牌不用比较 */
    /**
     * 找到新牌的位置
     * 如果新牌小于比较的牌，则将比较的牌往后移一位
     * 最后i退出的位置就是新牌的位置
     */
    let i = p;
    for (; i > 0 && newCard < data[i - 1]; i -= 1) {
      data[i] = data[i - 1];
    }
    data[i] = newCard;
  }
  return data;
}
```

时间复杂度

| 情况                     | 时间复杂度      | 是否稳定 |
| ------------------------ | --------------- | -------- |
| 最好（手里的牌已经有序） | T = O\(N\)      | 稳定     |
| 最坏（手里的牌逆序）     | T = O\(N \* N\) | 稳定     |

## 时间复杂度的下界

- 对于下标`i<j`,如果`data[i]` > `data[j]`,则称` (i,j)是一个``逆序对 `
- 交换相邻的两个元素，正好消除一个逆序对。

定理

- 任意 N 个不同元素组成的序列平均具有 N(N-1)/4 个逆序对
- 任何以交换相邻元素的排序的算法，其平均复杂度为(N \* N)

## 希尔排序

希尔排序是插入排序的优化版本，外部添加一个增量序列，通过扩大比较间隔的方式，快速消除逆序对。

```javascript
function shell_sort(data) {
  // 这里的增量序列采用是N/2的方式，实际运用有更好的方式
  for (let d = Math.floor(data.length / 2); d > 0; d = Math.floor(d / 2)) {
    for (let p = d; p < data.length; p += 1) {
      const newCard = data[p];
      let i = p;
      for (; i >= d && newCard < data[i - d]; i -= d) {
        data[i] = data[i - d];
      }
      data[i] = newCard;
    }
  }
  return data;
}
```

时间复杂度

| 情况                                   | 时间复杂度      | 是否稳定 |
| -------------------------------------- | --------------- | -------- |
| 最坏（和插入排序相同，增量元素不互质） | T = O\(N \* N\) |          |

## 选择排序

（升序）从下标`i`到下标`data.length - 1`中找到`最小元的下标`，然后交换下标`i`和`最小元下标`的值；

```javascript
function selection_sort(data) {
  for (let i = 0; i < data.length; i += 1) {
    /**
     * 从data[i]到data[data.length - 1]中找出最小值下标
     */
    let minPos = i;
    for (let j = i + 1; j < data.length; j += 1) {
      if (data[j] < data[minPos]) minPos = j;
    }
    // 如果本身就是最小值则不需要交换
    if (minPos !== i) {
      const temp = data[minPos];
      data[minPos] = data[i];
      data[i] = temp;
    }
  }
  return data;
}
```

时间复杂度

| 情况 | 时间复杂度      | 是否稳定 |
| ---- | --------------- | -------- |
| 最坏 | T = O\(N \* N\) |          |
| 最好 | T = O\(N \* N\) |          |

## 堆排序

堆排序是对选择排序的改进，优化了从下标`i`到下标`data.length - 1`中找到`最小元的下标`这一步骤，在最大堆中`data[0]`存放的是最大值

## 归并排序

核心：两个有序子序列的合并。

例子如下:

```javascript
/**
 * 归并排序的核心，有序子列的归并
 * 时间复杂度T=O(N)
 * 稳定
 * @param {array} array 原数组
 * @param {array} tempArray 临时数组
 * @param {number} LS 左数组起始位置
 * @param {number} RS 右数组起始位置
 * @param {number} RE 右数组结束位置
 * @return {该方法最终会修改原数组array}
 */
function m_sort(array, tempArray, LS, RS, RE) {
  // 左数组结束位置
  const LE = RS - 1;
  // 归并元素的总个数
  const num = RE - LS + 1;
  // 临时数组的存放位置的起点
  let tmpPointer = LS;
  while (LS <= LE && RS <= RE) {
    if (array[LS] < array[RS]) {
      tempArray[tmpPointer++] = array[LS];
      LS += 1;
    } else {
      tempArray[tmpPointer++] = array[RS];
      RS += 1;
    }
  }
  // 右数组迭代完毕，直接放入左数组
  for (; LS <= LE; LS += 1) {
    tempArray[tmpPointer++] = array[LS];
  }
  // 左数组迭代完毕，直接放入右数组
  for (; RS <= RE; RS += 1) {
    tempArray[tmpPointer++] = array[RS];
  }
  // 将临时数组，放入原数组
  for (let i = 0; i < num; i += 1, RE -= 1) {
    array[RE] = tempArray[RE];
  }

  /**
   * test
   */
  const data1 = [2, 8, 20, 40, 50];
  const data2 = [3, 5, 6, 18, 35, 66, 77];
  const array = [...data1, ...data2];
  const tempArray = new Array(array.length);
  const LS = 0;
  const RS = data1.length;
  const RE = array.length - 1;
  m_sort(array, tempArray, LS, RS, RE);
  console.log(array);
}
```

1. 分而治之，递归实现归并排序算法

```javascript
/**
 * 递归实现
 * @param {array} array 原数组
 * @param {array} tempArray 临时数组
 * @param {number} LS 左边起始下标
 * @param {number} RE 右边结束下标
 */
function merge_sort1(array, tempArray, LS, RE) {
  // 当元素只剩一个时退出
  if (LS < RE) {
    const center = Math.floor((RE + LS) / 2);
    merge_sort1(array, tempArray, LS, center);
    merge_sort1(array, tempArray, center + 1, RE);
    m_sort(array, tempArray, LS, center + 1, RE);
  }
}
```

2. 归并排序，非递归实现

将序列分为若干份，分别进行归并，最终进行合并。

```
/**
 * 一趟归并
 * @param {*} array 原数组
 * @param {*} tempArray 临时数组
 * @param {*} arrayLength 数组长度
 * @param {*} length 归并对的长度
 */
function iter_merge_core(array, tempArray, arrayLength, length) {
  let i = 0;
  for (; i <= arrayLength - 2 * length; i += 2 * length) {
    m_sort(array, tempArray, i, i + length, i + 2 * length - 1);
  }
  if (i + length < arrayLength) {
    // 归并最后两个子列
    m_sort(array, tempArray, i, i + length, arrayLength - 1);
  } else {
    // 最后只剩下一个子列
    for (let j = i; j < arrayLength; j += 1) {
      tempArray[j] = array[j];
    }
  }
}

/**
 * 归并排序，非递归实现
 * @param {*} array
 */
function merge_sort2(array) {
  let length = 1;
  const arrayLength = array.length;
  const tempArray = new Array(array.length);
  while (length < arrayLength) {
    iter_merge_core(array, tempArray, arrayLength, length);
    length *= 2;
  }
}
```

时间复杂度

| 情况 | 时间复杂度         | 是否稳定 |
| ---- | ------------------ | -------- |
| 最坏 | T = O\(Nlog\(N\)\) | 稳定     |
| 最好 | T = O\(Nlog\(N\)\) | 稳定     |
| 平均 | T = O\(Nlog\(N\)\) | 稳定     |

## 快速排序

同样是分而治之的策略，以下是快排的策略：

- 从一个数组中选主元
- 根据主元，将数组分为两个独立子集，左边都小于主元，右边都大于主元。
- 分别在两个独立子集中重复以上步骤

`当数据规模较小时，插入排序效率较低`

```javascript
/**
 * 固定主元
 * 主元选取array的最后一个元素
 * @param {*} array
 * @param {*} left
 * @param {*} right
 */
function quick_sort2(array, left, right) {
  if (right - left >= 1) {
    const pivot = array[right];
    let i = left - 1;
    let j = right;
    for (;;) {
      while (array[++i] < pivot) {}
      while (array[--j] > pivot) {}
      if (i < j) {
        swap(array, i, j);
      } else {
        break;
      }
    }
    swap(array, i, right);
    quick_sort2(array, left, i - 1);
    quick_sort2(array, i + 1, right);
  }
}
```
