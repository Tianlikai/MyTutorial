import instantiateReactComponent from "./util/instantiateReactComponent";

/**
 * component 类
 * react 基础标签类型，类似与html中的（'div','span' 等）
 * @param {*} element 基础元素
 */
function ReactDOMComponent(element) {
  this._currentElement = element;
  this._rootNodeID = null;
}

/**
 * component 类 装载方法
 * @param {*} rootID 元素id
 * @param {string} 返回dom
 */
ReactDOMComponent.prototype.mountComponent = function(rootID) {
  this._rootNodeID = rootID;
  var props = this._currentElement.props;

  // 外层标签
  var tagOpen = `<${this._currentElement.type} data-reactid="${
    this._rootNodeID
  }"`;
  var tagClose = `</${this._currentElement.type}>`;

  // 拼接标签属性
  for (var propName in props) {
    // 属性为绑定事件
    if (/^on[A-Za-z]/.test(propName)) {
      var eventType = propName.replace("on", "");
      // 对当前节点添加事件代理
      $(document).delegate(
        `[data-reactid="${this._rootNodeID}"]`,
        `${eventType}.${this._rootNodeID}`,
        props[propName]
      );
    }

    // 对于props 上的children和事件属性不做处理
    if (
      props[propName] &&
      propName !== "children" &&
      !/^on[A-Za-z]/.test(propName)
    ) {
      tagOpen += ` ${propName}=${props[propName]}`;
    }
  }
  // 渲染子节点dom
  var content = "";
  var children = props.children || [];
  var childrenInstance = []; // 保存子节点component 实例

  children.forEach((child, key) => {
    var childComponentInstance = instantiateReactComponent(child);
    // 为子节点添加标记
    childComponentInstance._mountIndex = key;
    childrenInstance.push(childComponentInstance);

    var childMarkup = childComponentInstance.mountComponent(
      `${this._rootNodeID}.${key}`
    );

    // 拼接子节点dom
    content += childMarkup;
  });
  return tagOpen + ">" + content + tagClose;
};

export default ReactDOMComponent;
