/**
 * component 类
 * 文本类型
 * @param {*} text 文本内容
 */
function ReactDOMTextComponent(text) {
  this._currentElement = text;
  this._rootNodeID = null;
}

export default ReactDOMTextComponent;
