import ReactClass from "./ReactClass";

function ReactCompositeComponent(element) {
  this._currentElement = element;
  this._rootNodeID = null;
  this._instance = null;
}
ReactCompositeComponent.prototype.mountComponent = function(rootID) {
  this._rootNodeID = rootID;
  var publicProps = this._currentElement.props;
  var ReactClass = this._currentElement.type;

  var inst = new ReactClass(publicProps);
  this._instance = inst;
  inst._reactInternalInstance = this;

  if (inst.componentWillMount) {
    inst.componentWillMount();
  }

  var renderedElement = this._instance.render();
  var renderedComponentInstance = instantiateReactComponent(renderedElement);
  this._renderedComponent = renderedComponentInstance;
  var renderedMarkup = renderedComponentInstance.mountComponent(
    this._rootNodeID
  );

  //之前我们在React.render方法最后触发了mountReady事件，所以这里可以监听，在渲染完成后会触发。
  $(document).on("mountReady", function() {
    //调用inst.componentDidMount
    inst.componentDidMount && inst.componentDidMount();
  });

  return renderedMarkup;
};

export default ReactCompositeComponent;
