function ReactClass() {}

ReactClass.prototype.render = function() {};

ReactClass.prototype.setState = function(newState) {
  // ReactCompositeComponent.prototype.mountComponent 装载时保存的当前实例
  this._reactInternalInstance.receiveComponent(null, newState);
};

export default ReactClass;
