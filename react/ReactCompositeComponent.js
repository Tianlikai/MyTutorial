import instantiateReactComponent from "./util/instantiateReactComponent";

/**
 * component 类
 * 复合组件类型
 * @param {*} element 元素
 */
function ReactCompositeComponent(element) {
  this._currentElement = element;
  this._rootNodeID = null;
  this._instance = null;
}

/**
 * component 类 装载方法
 * @param {*} rootID 元素id
 * @param {string} 返回dom
 */
ReactCompositeComponent.prototype.mountComponent = function(rootID) {
  this._rootNodeID = rootID;

  // 当前元素属性
  var publicProps = this._currentElement.props;
  // 对应的ReactClass
  var ReactClass = this._currentElement.type;

  var inst = new ReactClass(publicProps);
  this._instance = inst;

  // 保留对当前 component的饮用
  inst._reactInternalInstance = this;

  if (inst.componentWillMount) {
    // 声明周期方法
    inst.componentWillMount();
  }

  // 调用 ReactClass 实例的render 方法，返回一个element或者文本节点
  var renderedElement = this._instance.render();
  var renderedComponentInstance = instantiateReactComponent(renderedElement);
  this._renderedComponent = renderedComponentInstance; // 缓存component 以后用

  var renderedMarkup = renderedComponentInstance.mountComponent(
    this._rootNodeID
  );

  // dom 装载到html 后调用生命周期
  $(document).on("mountReady", function() {
    inst.componentDidMount && inst.componentDidMount();
  });
  return renderedMarkup;
};

export default ReactCompositeComponent;
