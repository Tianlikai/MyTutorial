/**
 * component 类
 * 文本类型
 * @param {*} text 文本内容
 */
function ReactDOMTextComponent(text) {
  this._currentElement = text;
  this._rootNodeID = null;
}

/**
 * component 类 装载方法
 * @param {number} rootID 元素id
 * @return {string} 返回dom
 */
ReactDOMTextComponent.prototype.mountComponent = function(rootID) {
  this._rootNodeID = rootID;
  return `<span data-reactid="${this._rootNodeID}">${
    this._currentElement
  }</span>`;
};

export default ReactDOMTextComponent;
