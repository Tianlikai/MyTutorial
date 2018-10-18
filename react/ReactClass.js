/**
 * 所有自定义组件的超类
 * @function render所有自定义组件都有该方法
 */
function ReactClass() {}

ReactClass.prototype.render = function() {};

ReactClass.prototype.setState = function(newState) {
  // 拿到ReactCompositeComponent的实例
  this._reactInternalInstance.receiveComponent(null, newState);
};

export default ReactClass;
