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

/**
 * component 类 更新
 * @param {*} nextElement
 */
ReactDOMComponent.prototype.receiveComponent = function(nextElement) {
  var lastProps = this._currentElement.props;
  var nextProps = nextElement.props;
  this._currentElement = nextElement;
  // 处理当前节点的属性
  this._updateDOMProperties(lastProps, nextProps);
  // 处理当前节点的子节点变动
  this._updateDOMChildren(nextElement.props.children);
};

/**
 *
 * @param {*} lastProps
 * @param {*} nextProps
 */
ReactDOMComponent.prototype._updateDOMProperties = function(
  lastProps,
  nextProps
) {
  // 当老属性不在新属性的集合里时，需要删除属性
  var propName;
  for (propName in lastProps) {
    if (
      nextProps.hasOwnProperty(propName) &&
      !lastProps.hasOwnProperty(propName)
    ) {
      // 新属性中有，且不再老属性的原型中
      continue;
    }
    if (/^on[A-Za-z]/.test(propName)) {
      var eventType = propName.replace("on", "");
      // 特殊事件，需要去掉事件监听
      $(document).undelegate(
        `[data-reactid="${this._rootNodeID}"]`,
        eventType,
        lastProps[propName]
      );
      continue;
    }
    // 删除不需要的属性
    $(`[data-reactid="${this._rootNodeID}"]`).removeAttr(propName);
  }
  // 对于新的事件，需要写到dom上
  for (propName in nextProps) {
    if (propName === "children") continue;

    if (/^on[A-Za-z]/.test(propName)) {
      var eventType = propName.replace("on", "");
      // 删除老的事件绑定
      lastProps[propName] &&
        $(document).undelegate(
          `[data-reactid="${this._rootNodeID}"]`,
          eventType,
          lastProps[propName]
        );
      // 重新绑定
      $(document).delegate(
        `[data-reactid="${this._rootNodeID}"]`,
        eventType,
        nextProps[propName]
      );
      continue;
    }

    // 添加新的属性，重写同名属性
    $(`[data-reactid="${this._rootNodeID}"]`).prop(
      propName,
      nextProps[propName]
    );
  }
};

export default ReactDOMComponent;
