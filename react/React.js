import ReactClass from "./ReactClass";
import ReactElement from "./ReactElement";
import ReactDOMComponent from "./ReactDOMComponent";
import ReactDOMTextComponent from "./ReactDOMTextComponent";
import ReactCompositeComponent from "./ReactCompositeComponent";

/**
 * React 对象
 * @func createElement 创建虚拟元素
 * @func render React 入口调用函数
 */
const React = {
  nextReactRootIndex: 0,

  /**
   * @param {*} type 元素的 component 类型
   * @param {*} config 元素配置
   * @param {*} children 元素的子元素
   */
  createElement: function(type, config, children) {
    var props = {};
    var propName;
    var config = config || {};
    // 如果有 key 则作为元素的唯一标示
    var key = config.key || null;

    // 获取config 拥有的元素
    for (propName in config) {
      if (config.hasOwnProperty(propName) && propName !== "key") {
        props[propName] = config[propName];
      }
    }

    // 将元素的 children，都挂载到props.children 上
    // children 用数组存放
    var childrenLength = arguments.length - 2;
    if (childrenLength === 1) {
      props.children = Array.isArray(children) ? children : [children];
    } else if (childrenLength > 1) {
      var childArray = [];

      for (var i = 0; i < childrenLength; ++i) {
        childArray.push(arguments[i + 2]);
      }

      props.children = childArray;
    }

    // 此处忽略掉默认属性的处理

    //返回一个React 元素
    return new ReactElement(key, type, props);
  },

  /**
   * 接收一个React元素，和一个dom节点
   * @param {*} element React元素
   * @param {*} container 负责装载的dom
   */
  render: function(element, container) {}
};

export default React;
