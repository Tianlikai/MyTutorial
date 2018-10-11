import ReactElement from "./ReactElement";
import ReactDOMTextComponent from "./ReactDOMTextComponent";
import ReactDOMComponent from "./ReactDOMComponent";
import ReactCompositeComponent from "./ReactCompositeComponent";
import ReactClass from "./ReactClass";

// 实例化
function instantiateReactComponent(node) {
  if (typeof node === "string" || typeof node === "number") {
    // 文本类型
    return new ReactDOMTextComponent(node);
  } else if (typeof node === "object" && typeof node.type === "string") {
    // ReactDOMComponent
    return new ReactDOMComponent(node);
  } else if (typeof node === "object" && typeof node.type === "function") {
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
      props.children = Array.isArray(props.children)
        ? props.children
        : [props.children];
    } else if (childrenLength.length > 1) {
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
