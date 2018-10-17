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
