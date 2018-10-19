import instantiateReactComponent from "./util/instantiateReactComponent";
import _shouldUpdateReactComponent from "./util/_shouldUpdateReactComponent";

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

/**
 * component 类 更新
 * @param {*} nextElement
 * @param {*} newState
 */
ReactCompositeComponent.prototype.receiveComponent = function(
  nextElement,
  newState
) {
  // 如果接受了新的element，则直接使用最新的element
  this._currentElement = nextElement || this._currentElement;

  var inst = this._instance;

  // 合并state
  var nextState = Object.assign(inst.state, newState);
  var nextProps = this._currentElement.props;

  // 更新state
  inst.state = nextState;

  // 生命周期方法
  if (
    inst.shouldComponentUpdate &&
    inst.shouldComponentUpdate(nextProps, nextState) === false
  ) {
    // 如果实例的 shouldComponentUpdate 返回 false，则不需要继续往下执行更新
    return;
  }

  // 生命周期方法
  inst.componentWillUpdate && inst.componentWillUpdate(nextProps, nextState);

  // 获取老的element
  var preComponentInstance = this._renderedComponent;
  var preRenderedElement = preComponentInstance._currentElement;

  // 通过重新render 获取新的element
  var nextRenderedElement = this._instance.render();

  // 比较新旧元素
  if (_shouldUpdateReactComponent(preRenderedElement, nextRenderedElement)) {
    // 两种元素为相同，需要更新，执行字节点更新
    preComponentInstance.receiveComponent(nextRenderedElement);
    // 生命周期方法
    inst.componentDidUpdate && inst.componentDidUpdate();
  } else {
    // 两种元素的类型不同，直接重新装载dom
    var thisID = this._rootNodeID;
    this._renderedComponent = instantiateReactComponent(nextRenderedElement);
    var renderedMarkup = this._renderedComponent.mountComponent(thisID);
    $(`[data-reactid="${thisID}"`).replaceWith(renderedMarkup);
  }
};

export default ReactCompositeComponent;
