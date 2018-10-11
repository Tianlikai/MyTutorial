import ReactClass from "./ReactClass";
import {
  instantiateReactComponent,
  _shouldUpdateReactComponent
} from "./React";

// 自定义组件
function ReactCompositeComponent(element) {
  this._currentElement = element;
  this._rootNodeID = null;
  this._instance = null;
}

// 首次装载
ReactCompositeComponent.prototype.mountComponent = function(rootID) {
  this._rootNodeID = rootID;

  var publicProps = this._currentElement.props;

  // this._currentElement.type 为 Constructor 构造函数类
  var ReactClass = this._currentElement.type;

  // 实例化 一个 复合组件
  var inst = new ReactClass(publicProps);

  this._instance = inst;
  inst._reactInternalInstance = this;

  if (inst.componentWillMount) {
    inst.componentWillMount();
  }

  // 复合组件的 render() 方法
  // 返回一个需要渲染的元素 类型不确定
  var renderedElement = this._instance.render();
  // 实例化子组件实例
  var renderedComponentInstance = instantiateReactComponent(renderedElement);
  // 缓存子组件实例
  this._renderedComponent = renderedComponentInstance;
  // 装载子组件
  var renderedMarkup = renderedComponentInstance.mountComponent(
    this._rootNodeID
  );

  //之前我们在React.render 方法最后触发了 mountReady事件，所以这里可以监听，在渲染完成后会触发。
  $(document).on("mountReady", function() {
    // 当子组件的 componentDidMount() 方法调用完后 调用父组件的 componentDidMount() 方法
    // 调用inst.componentDidMount
    inst.componentDidMount && inst.componentDidMount();
  });

  return renderedMarkup;
};

// 更新状态
ReactCompositeComponent.prototype.receiveComponent = function(
  nextElement,
  newState
) {
  debugger
  this._currentElement = nextElement || this._currentElement;
  var inst = this._instance;

  // 合并state
  var nextState = $.extend(inst.state, newState);
  // 获取当前props
  var nextProps = this._currentElement.props;

  // 改写state
  inst.state = nextState;

  // 如果 inst 有 shouldComponentUpdate 并且返回 false。说明组件本身判断不要更新，就直接返回。
  if (
    inst.shouldComponentUpdate &&
    inst.shouldComponentUpdate(nextProps, nextState) === false
  ) {
    return null;
  }

  // 有生命周期componentWillUpdate
  if (inst.componentWillUpdate) {
    inst.componentWillUpdate(nextProps, nextState);
  }

  var prevComponentInstance = this._renderedComponent;
  var prevRenderedElement = prevComponentInstance._currentElement;

  // 拿到新的 element
  var nextRenderedElement = this._instance.render();

  // _shouldUpdateReactComponent 全局方法
  // 判断是需要更新还是直接就重新渲染
  if (_shouldUpdateReactComponent(prevRenderedElement, nextRenderedElement)) {
    // 如果需要更新，就继续调用子节点的receiveComponent的方法，传入新的element更新子节点。
    prevComponentInstance.receiveComponent(nextRenderedElement);
    // 调用componentDidUpdate表示更新完成了
    inst.componentDidUpdate && inst.componentDidUpdate();
  } else {
    // 如果发现完全是不同的两种element，那就干脆重新渲染了
    var thisID = this._rootNodeID;

    // 重新 new 一个对应的 component
    this._renderedComponent = this._instantiateReactComponent(
      nextRenderedElement
    );
    // 重新生成对应的元素内容
    var nextMarkup = _renderedComponent.mountComponent(thisID);

    // 替换整个节点
    $('[data-reactid="' + this._rootNodeID + '"]').replaceWith(nextMarkup);
  }
};

export default ReactCompositeComponent;
