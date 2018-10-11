// ReactDOMComponent 类型
function ReactDOMComponent(element) {
  this._currentElement = element;
  this._rootId = null;
}

ReactDOMComponent.prototype.mountComponent = function(rootID) {
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

export default ReactDOMComponent;
