function ReactClass() {}

ReactClass.prototype.render = function() {};

ReactClass.prototype.setState = function(newState) {
  // 自定义组件 mountComponent 首次装载时保存 ReactCompositeComponent 实例
  this._reactInternalInstance.receiveComponent(null, newState);
};

export default ReactClass;
