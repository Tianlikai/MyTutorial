import {
  instantiateReactComponent,
  _shouldUpdateReactComponent
} from "./React";

// 全局更新深度标识
var updateDepth = 0;
// 全局更新队列，保存所有差异
var diffQueue = [];

// diff 更新类型
var UPDATE_TYPE = {
  MOVE_EXISTING: 1,
  REMOVE_NODE: 2,
  INSERT_MARKUP: 3
};

/**
 * 将数组children 改为map
 * map 的 key 就是 element 的key
 * 如果为 text 元素 或者没有 key 值，则key为数组下标
 * @param {array} componentChildren
 * @return {object}
 */
function flattenChildren(componentChildren) {
  var name;
  var childrenMap = {};
  componentChildren.forEach((child, i) => {
    name =
      child._currentElement && child._currentElement.key
        ? child._currentElement.key
        : i.toString(32);
    childrenMap[name] = child;
  });
  return childrenMap;
}

/**
 * 生成一个子节点elements map
 * @param {*} prevChildren
 * @param {*} nextChildrenElements
 * @return {object}
 */
function generateComponentChildren(prevChildren, nextChildrenElements) {
  var nextChildren = {};
  var nextChildrenElements = nextChildrenElements || [];

  $.each(nextChildrenElements, function(i, element) {
    var name                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           n                                      jjjnm= element.key ? element.key : i;
    var prevChild = prevChildren && prevChildren[name];
    var prevElement = prevChild._currentElement;
    var nextElement = element;

    if (_shouldUpdateReactComponent(prevElement, nextElement)) {
      // 对与需要更新的节点直接调用 receiveComponent
      prevChild.receiveComponent(prevElement);
      nextChildren[name] = prevChild;
    } else {
      // 对于新增的节点，生成一个新的component
      var nextChildInstance = instantiateReactComponent(nextElement);
      nextChildren[name] = nextChildInstance;
    }
  });

  return nextChildren;
}

// ReactDOMComponent
function ReactDOMComponent(element) {
  this._currentElement = element;
  this._rootNodeID = null;
}

// 首次装载
ReactDOMComponent.prototype.mountComponent = function(rootID) {
  this._rootNodeID = rootID;
  var props = this._currentElement.props;
  var tagOpen = "<" + this._currentElement.type;
  var tagClose = "</" + this._currentElement.type + ">";
  tagOpen += " data-reactid=" + this._rootNodeID;

  for (var propKey in props) {
    if (/^on[A-Za-z]/.test(propKey)) {
      // 这里要做一下事件的监听，就是从属性 props 里面解析拿出 on 开头的事件属性的对应事件监听
      var eventType = propKey.replace("on", "");
      // 将事件委托到 data-reactid = this._rootNodeID 上
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

  // 记录所有 children 中生成的 html
  var content = "";

  var children = props.children || [];
  // 用于保存所有的子节点的 component 实例，以后会用到
  var childrenInstances = [];
  var that = this;
  $.each(children, function(key, child) {
    // 这里再次调用了 instantiateReactComponent 实例化子节点 component 类，拼接好返回
    // children 为 React.createElement(type, props, children) 中的所有 children 数组
    var childComponentInstance = instantiateReactComponent(child);
    childComponentInstance._mountIndex = key;

    childrenInstances.push(childComponentInstance);

    // 子节点的 rootId 是父节点的 rootId 加上新的 key 也就是顺序的值拼成的新值
    var curRootId = that._rootNodeID + "." + key;
    // 得到子节点的渲染内容
    var childMarkup = childComponentInstance.mountComponent(curRootId);
    // 拼接在一起
    content += " " + childMarkup;
  });

  // 留给以后更新时用的这边先不用管
  this._renderedChildren = childrenInstances;

  // 拼出整个html内容
  return tagOpen + ">" + content + tagClose;
};

/**
 * 更新
 * 基本元素更新
 * 1: 属性更新（特殊属性，事件处理）
 * 2: 子节点更新
 *    diff  拿新的子节点树跟以前老的子节点树对比，找出他们之间的差别。
 *    patch 所有差别找出后，再一次性的去更新。
 * @param {*} nextElement
 */
ReactDOMComponent.propKey.receiveComponent = function(nextElement) {
  var lastProps = this._currentElement.props;
  var nextProps = nextElement.props;

  this._currentElement = nextElement;

  // 更新属性
  this._updateDomProperties(lastProps, nextProps);
  // 更新子节点
  this._updateDOMChildren(nextElement.props.children);
};

/**
 * 更新属性
 * @param {*} lastProps
 * @param {*} nextProps
 */
ReactDOMComponent.prototype._updateDomProperties = function(
  lastProps,
  nextProps
) {
  var propKey;

  // 当老的属性不在新的属性中时，则从dom中将该属性删除
  for (propKey in lastProps) {
    // 跳过 出现在新的属性里或者是存在原型上的
    if (
      nextProps.hasOwnProperty(propKey) ||
      !lastProps.hasOwnProperty(propKey)
    ) {
      continue;
    }

    // 事件监听相关的，取消事件监听
    if (/^on[A-Za-z]/.test(propKey)) {
      var eventType = propKey.replace("on", "");
      // 取消该事件的事件委托
      $(document).undelegate(
        '[data-reactid="' + this._rootNodeID + '"]',
        eventType,
        lastProps[propKey]
      );
      continue;
    }
    // 删除属性
    $('[data-reactid="' + this._rootNodeID + '"]').removeAttr(propKey);
  }

  // 将新的属性写入dom
  for (propKey in nextProps) {
    // 对于事件监听的属性我们需要特殊处理
    if (/^on[A-Za-z]/.test(propKey)) {
      var eventType = propKey.replace("on", "");
      // 以前如果已经有，说明有了监听，需要先去掉
      lastProps[propKey] &&
        $(document).undelegate(
          '[data-reactid="' + this._rootNodeID + '"]',
          eventType,
          lastProps[propKey]
        );
      // 针对当前的节点添加事件代理,以_rootNodeID为命名空间
      $(document).delegate(
        '[data-reactid="' + this._rootNodeID + '"]',
        eventType + "." + this._rootNodeID,
        nextProps[propKey]
      );
      continue;
    }

    if (propKey === "children") {
      continue;
    }

    // 添加新的属性，更新同名属性
    $(`[data-reactid="` + this._rootNodeID + '"]').prop(
      propKey,
      nextProps[propKey]
    );
  }
};

/**
 * 更新子节点
 * @param {*} children
 */
ReactDOMComponent.prototype._updateDOMChildren = function(
  nextChildrenElements
) {
  updateDepth++;

  // 分析差异
  this._diff(diffQueue, nextChildrenElements);

  updateDepth--;
  if (updateDepth === 0) {
    // 执行具体的dom操作
    this._patch(diffQueue);
    diffQueue = [];
  }
};

ReactDOMComponent.prototype._diff = function(diffQueue, nextChildrenElements) {
  // 使用相同的component，所以执行移动操作
  // 不相同，说明是新增加的节点
  // 如果老的存在，就是element不同，但是component一样，我们需要把老的element删除
  //如果以前已经渲染过了，记得先去掉以前所有的事件监听，通过命名空间全部清空
  //对于老的节点里有，新的节点里没有的那些，也全都删除掉
};

export default ReactDOMComponent;
