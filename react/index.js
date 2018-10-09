// 虚拟dom模型
function ReactElement(type, props, keys) {
  this.type = type;
  this.props = props;
  this.keys = keys;
}

// React 文本类型
function ReactDOMTextComponent(text) {
  this._currentElement = "" + text;
  this._rootId = null;
}
ReactDOMTextComponent.prototype.mountComponent = function(rootID) {
  this._rootId = rootID;
  return (
    '<span data-reactid="' + rootID + '">' + this._currentElement + "</span>"
  );
};

// ReactDomElement 类型
function ReactDomElement(element) {
  this._currentElement = element;
  this._rootId = null;
}
ReactDomElement.prototype.mountComponent = function(rootID) {
  this._rootID = rootID;
  var props = this._currentElement.props;
  var tagOpen = "<" + this._currentElement.type;
  var tagClose = "</" + this._currentElement.type + ">";
  tagOpen += " data-reactid=" + this._rootNodeID;

  for (var propKey in props) {
    if (/^on[A-Za-z]/.test(propKey)) {
      // 这里要做一下事件的监听，就是从属性props里面解析拿出on开头的事件属性的对应事件监听
      var eventType = props.propKey.replace("on", "");
      $(document).delegate(
        '[data-reactid="' + this._rootNodeID + '"]',
        eventType + "." + this._rootNodeID,
        props[propKey]
      );
    }

    // 对于children属性以及事件监听的属性不需要进行字符串拼接
    // 事件会代理到全局。这边不能拼到dom上不然会产生原生的事件监听
    if (
      props[propKey] &&
      propKey != "children" &&
      !/^on[A-Za-z]/.test(propKey)
    ) {
      tagOpen += " " + propKey + "=" + props[propKey];
    }
  }

  var content = "";
  var children = props.children || [];
  // 用于保存所有的子节点的 componet实例，以后会用到
  var childrenInstances = [];
  var that = this;
  $.each(children, function(key, child) {
    // 这里再次调用了instantiateReactComponent实例化子节点component类，拼接好返回
    var childComponentInstance = instantiateReactComponent(child);
    childComponentInstance._mountIndex = key;

    childrenInstances.push(childComponentInstance);
    // 子节点的rootId是父节点的rootId加上新的key也就是顺序的值拼成的新值
    var curRootId = that._rootNodeID + "." + key;
    // 得到子节点的渲染内容
    // 递归
    var childMarkup = childComponentInstance.mountComponent(curRootId);
    // 拼接在一起
    content += " " + childMarkup;
  });

  // 留给以后更新时用的这边先不用管
  this._renderedChildren = childrenInstances;

  // 拼出整个html内容
  return tagOpen + ">" + content + tagClose;
};

// 实例化
function instantiateReactComponent(node) {
  if (typeof node === "string" || typeof node === "number") {
    // 文本类型
    return new ReactDOMTextComponent(node);
  } else if (typeof node === "object" && typeof node.type === "string") {
    // ReactDomElement
    return new ReactDOMComponent(node);
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

  render: function(element, container) {
    var componentInstance = instantiateReactComponent(element);
    var markup = componentInstance.mountComponent(React.nextReactRootIndex++);
    $(container).html(markup);
    $(document).trigger("mountReady");
  }
};

React.render("hello world", document.getElementById("root"));
