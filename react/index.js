// react 文本dom
function ReactDOMTextComponent(text) {
  this._currentElement = "" + text;
  this._rootId = null;
}

ReactDOMTextComponent.prototype.mountComponent = function(rootID) {
  this._rootId = rootID;
  return (
    '<span data-reactid="' + rootID + '">' + this._currentElement + "</span>"
  );
};

// 实例化
function instantiateReactComponent(node) {
  if (typeof node === "string" || typeof node === "number") {
    return new ReactDOMTextComponent(node);
  }
}

const React = {
  nextReactRootIndex: 0,
  render: function(element, container) {
    var componentInstance = instantiateReactComponent(element);
    var markup = componentInstance.mountComponent(React.nextReactRootIndex++);
  }
};

// function mountComponent(container) {
//   const domElement = document.createElement(this._currentElement.type);
//   const text = this._currentElement.props.children;
//   const textNode = document.createTextNode(text);

//   domElement.appendChild(textNode);
//   container.appendChild(domElement);

//   this._hostNode = domElement;
//   return domElement;
// }
