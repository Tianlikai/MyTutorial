/**
 * component 类
 * react 基础标签类型，类似与html中的（'div','span' 等）
 * @param {*} element 基础元素
 */
function ReactDOMComponent(element) {
  this._currentElement = element;
  this._rootNodeID = null;
}

export default ReactDOMComponent;
