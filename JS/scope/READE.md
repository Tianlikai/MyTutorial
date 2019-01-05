# 前言

几乎所有编程语言最基本的功能之一，就是能够储存变量当中的值，并且能在之后对这个值进行访问或修改。事实上，正是这种储存和访问变量的值的能力将状态带给了程序。

但是将变量引入程序会引起几个很有意思的问题，也正是我们将要讨论的：这些变量住在哪里？换句话说，它们储存在哪里？最重要的是，程序需要时如何找到它们？

这些问题说明需要一套设计良好的规则来存储变量，并且之后可以方便地找到这些变量。这套规则被称为作用域。

## 编译原理

虽然大家常说 JavaScript 为动态语言，但事实上 JavaScript 为一门编译语言。它不会像其他语言一样提前编译，它会在代码执行前进行编译。

在传统编译语言的流程中，程序中的源代码在编译过程中一般会进行三个步骤。

- 分词/词法分析
- 解析/语法分析
- 代码生成

！这里不做过多解释

## JavaScript 作用域

理解 JavaScript 作用域，要明白作用域在 js 中起到作用以及其 js 之间的关系。首先这里介绍 js 的三个重要角色。

- 引擎

  > 从头到尾负责整个 JavaScript 程序的编译及执行过程。

- 编译器

  > 引擎的好朋友之一，负责语法分析及代码生成等脏活累活（详见前一节的内容）。

- 作用域
  > 引擎的另一位好朋友，负责收集并维护由所有声明的标识符（变量）组成的一系列查
  > 询，并实施一套非常严格的规则，确定当前执行的代码对这些标识符的访问权限。

为了能够完全理解 JavaScript 的工作原理，你需要开始像引擎（和它的朋友们）一样思考，
从它们的角度提出问题，并从它们的角度回答这些问题。

### 引擎~编译器~作用域之间的协作

当我们运行到 var a = 2 时，这里会被解释为:

- 遇到 var a，`编译器会`询问`作用域`是否已经有一个该名称的变量存在于同一个作用域的
  集合中。如果是，编译器会忽略该声明，继续进行编译；否则它会要求作用域在当前作
  用域的集合中声明一个新的变量，并命名为 a。

- 接下来`编译器`会为引擎生成`运行时`所需的代码，这些代码被用来处理 `a = 2` 这个赋值
  操作。`引擎运行时会首先询问作用域`，在当前的作用域集合中是否存在一个叫作 a 的
  变量。如果是，引擎就会使用这个变量；如果否，引擎会继续查找该变量。

- 总结
  > 变量的赋值操作会执行两个动作，首先编译器会在当前作用域中声明一个变量（如
  > 果之前没有声明过），然后在运行时引擎会在作用域中查找该变量，如果能够找到就会对
  > 它赋值

### LHS 和 RHS

```
    /**
     * 这里对 a 进行了LHS查询
     * 当变量值出现在赋值操作符左侧时会进行LHS
     **/
    var a = 2

    /**
     * 这里对 a 进行了RHS查询
     * RHS 可译为（取到它的源值，获取某某的值）
     **/
    console.log(a)

    /**
     * 这里包含了一个隐藏的LHS
     * 当执行demo(...)时，会隐式的执行 a = 2
     **/
    function demo(a) {
        console.log(a)
    }
    demo(2)
```

### 引擎和作用域的对话

```
    function foo(a) {
      console.log( a ); // 2
    }
    foo( 2 );
```

让我们把上面这段代码的处理过程想象成一段对话，这段对话可能是下面这样的。

- 引擎：我说作用域，我需要为 foo 进行 RHS 引用。你见过它吗？
- 作用域：别说，我还真见过，编译器那小子刚刚声明了它。它是一个函数，给你。
- 引擎：哥们太够意思了！好吧，我来执行一下 foo。
- 引擎：作用域，还有个事儿。我需要为 a 进行 LHS 引用，这个你见过吗？
- 作用域：这个也见过，编译器最近把它声名为 foo 的一个形式参数了，拿去吧。
- 引擎：大恩不言谢，你总是这么棒。现在我要把 2 赋值给 a。
- 引擎：哥们，不好意思又来打扰你。我要为 console 进行 RHS 引用，你见过它吗？
- 作用域：咱俩谁跟谁啊，再说我就是干这个。这个我也有，console 是个内置对象。给你。
- 引擎：么么哒。我得看看这里面是不是有 log(..)。太好了，找到了，是一个函数。
- 引擎：哥们，能帮我再找一下对 a 的 RHS 引用吗？虽然我记得它，但想再确认一次。
- 作用域：放心吧，这个变量没有变动过，拿走，不谢。
- 引擎：真棒。我来把 a 的值，也就是 2，传递进 log(..)

### 作用域链

当一个块或函数嵌套在另一个块或函数中时，就发生了作用域的嵌套。因此，在当前作用
域中无法找到某个变量时，引擎就会在外层嵌套的作用域中继续查找，直到找到该变量，
或抵达最外层的作用域（也就是全局作用域）为止。

LHS 和 RHS 引用都会在当前作用域进行查找，如果没有找到，就会像冒泡一样前往上一层作用域，
如果还是没有找到就继续向上，以此类推。一旦抵达顶层（全局作用域），可能找到了你
所需的变量，也可能没找到，但无论如何查找过程都将停止。

### 异常

```
    function foo(a) {
        console.log( a + b );
        b = a;
    }
    foo( 2 );
```

当代码对 b 执行 RHS 查询时 遍历作用域也无法找到，此时会抛出 ReferenceError 异常。
但是当程序在执行 LHS 查询时 遍历作用域同样无法找到，在`非严格模式下`全局作用域会创建一个具有改名称的变量。

> ⚠️ 当 RHS 查找到一个指定变量，但是对该变量执行不合理操作时，会抛出 TypeError 异常。所以 ReferenceError 代表查找失败。TypeError 则查找成功。

### 来源

- 原文地址: [JavaScript 作用域](https://github.com/Tianlikai/MyTutorial/blob/master/scope/READE.md)
- JavaScript 词法作用域: [JavaScript 词法作用域](https://juejin.im/post/5ba9fefcf265da0afb33492c)
- react 撸后台: [企业级中后台项目](https://juejin.im/post/5b715c006fb9a009b628faaa)