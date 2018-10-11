import { instantiateReactComponent } from "./React";

// ReactDOMComponent 类型
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

export default ReactDOMComponent;
