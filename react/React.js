import ReactClass from "./ReactClass";
import ReactElement from "./ReactElement";
import instantiateReactComponent from "./util/instantiateReactComponent";

/**
 * React 对象
 * @func createElement 创建虚拟元素
 * @func render React 入口调用函数
 */
const React = {
  nextReactRootIndex: 0,

  /**
   * 创建 ReactClass
   * @param {*} spec 传入的对象
   */
  createClass: function(spec) {
    // 定义一个子类
    function Constructor(props) {
      this.props = props;
      this.state = this.getInitialState ? this.getInitialState() : null;
    }
    // 原型继承，继承超父类
    Constructor.prototype = new ReactClass();
    Constructor.prototype.constructor = Constructor;

    // 将spec，混入Constructor.prototype
    Object.assign(Constructor.prototype, spec);
    return Constructor;
  },

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
  render: function(element, container) {
    // 实例化组件
    var componentInstance = instantiateReactComponent(element);
    // 组件完成dom装载
    var markup = componentInstance.mountComponent(React.nextReactRootIndex++);
    // 将装载好的 dom 放入 container 中
    $(container).html(markup);
    $(document).trigger("mountReady");
  }
};

export default React;
