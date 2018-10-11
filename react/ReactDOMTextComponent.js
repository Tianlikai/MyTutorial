// React 文本
function ReactDOMTextComponent(text) {
  this._currentElement = "" + text;
  this._rootId = null;
}

// 首次装载      
ReactDOMTextComponent.prototype.mountComponent = function(rootID) {
  this._rootId = rootID;
  return (
    '<span data-reactid="' + rootID + '">' + this._currentElement + "</span>"
  );
};

export default ReactDOMTextComponent;
