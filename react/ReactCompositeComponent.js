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

export default ReactCompositeComponent;
