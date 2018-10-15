import ReactElement from "./ReactElement";
import ReactClass from "./ReactClass";

import ReactDOMTextComponent from "./ReactDOMTextComponent";
import ReactDOMComponent from "./ReactDOMComponent";
import ReactCompositeComponent from "./ReactCompositeComponent";

// 用来判定两个element需不需要更新
// 这里的 key 是我们 createElement 的时候可以选择性的传入的。用来标识这个element，当发现key不同时，我们就可以直接重新渲染，不需要去更新了。
export function _shouldUpdateReactComponent(prevElement, nextElement) {
  if (prevElement != null && nextElement != null) {
    var prevType = typeof prevElement;
    var nextType = typeof nextElement;
    if (prevType === "string" || prevType === "number") {
      return nextType === "string" || nextType === "number";
    } else {
      return (
        nextType === "object" &&
        prevElement.type === nextElement.type &&
        prevElement.key === nextElement.key
      );
    }
  }
  return false;
}

// 实例化
export function instantiateReactComponent(node) {
  if (typeof node === "string" || typeof node === "number") {
    // 文本类型
    return new ReactDOMTextComponent(node);
  } else if (typeof node === "object" && typeof node.type === "string") {
    // ReactDOMComponent
    return new ReactDOMComponent(node);
  } else if (typeof node === "object" && typeof node.type === "function") {
    // node.type 是否为一个 Constructor 构造函数类
    // 自定义组件
    return new ReactCompositeComponent(node);
  }
}

// React对象
const React = {
  nextReactRootIndex: 0,

  createElement: function(type, config, children) {
    var propsName,
      props = {},
      config = config || {},
      key = null;

    if (config != null) {
      key = config.key === undefined ? null : "" + config.key;
      for (propsName in config) {
        // config.hasOwnProperty 是否为对象自身拥有该属性，而不是原型上的
        if (propsName !== "key" && config.hasOwnProperty(propsName)) {
          props[propsName] = config[propsName];
        }
      }
    }

    var childrenLength = arguments.length - 2;
    if (childrenLength === 1) {
      props.children = Array.isArray(children) ? children : [children];
    } else if (childrenLength > 1) {
      var childArray = Array(childrenLength);
      for (var i = 0; i < childrenLength; ++i) {
        childArray[i] = arguments[i + 2];
      }
      props.children = childArray;
    }

    if (type && type.defaultProps) {
      var defaultProps = type.defaultProps;
      for (propsName in defaultProps) {
        if (typeof props[propsName] === "undefined") {
          // 如果某个属性为空，则取默认属性
          props[propsName] = defaultProps[propsName];
        }
      }
    }

    // 返回一个ReactElement实例对象
    return new ReactElement(type, props, key);
  },

  createClass: function(spec) {
    /**
     * Constructor 类
     * Constructor 持有 ReactClass 的 prototype 饮用
     * Constructor 最终混入 传入的各种属性和方法
     * @param {object} props 拥有属性
     * @private {object} State
     * @return {返回一个混入了 ReactClass原型和 spec属性方法的强化 Constructor类}
     * @return {为一个复合组件类，其中包含有自己的 props 和 state }
     */
    function Constructor(props) {
      this.props = props;
      this.state = this.getInitialState ? this.getInitialState() : null;
    }
    Constructor.prototype = new ReactClass();
    Constructor.prototype.constructor = Constructor;

    // 混入 spec 的原型
    $.extend(Constructor.prototype, spec);
    return Constructor;
  },

  render: function(element, container) {
    var componentInstance = instantiateReactComponent(element);
    var markup = componentInstance.mountComponent(React.nextReactRootIndex++);
    $(container).html(markup);
    $(document).trigger("mountReady");
  }
};

export default React;
