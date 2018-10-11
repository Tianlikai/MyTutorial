// React 文本
function ReactDOMTextComponent(text) {
  this._currentElement = "" + text;
  this._rootId = null;
}

/**
 * 首次装载
 **/
ReactDOMTextComponent.prototype.mountComponent = function(rootID) {
  this._rootId = rootID;
  return (
    '<span data-reactid="' + rootID + '">' + this._currentElement + "</span>"
  );
};

/**
 * 更新文本节点
 * @param {*} nextText
 */
ReactDOMTextComponent.prototype.receiveComponent = function(nextText) {
  var nextStringText = "" + nextText;
  if (nextStringText !== this._currentElement) {
    this._currentElement = nextStringText;
    $('[data-reactid="' + this._rootNodeID + '"]').html(this._currentElement);
  }
};

export default ReactDOMTextComponent;
