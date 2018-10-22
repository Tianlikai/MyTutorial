/**
 *
 * @param {*} parentNode
 * @param {*} childNode
 * @param {*} index
 */
function insertChildAt(parentNode, childNode, index) {
  var beforeChild = parentNode.children().get(index);
  beforeChild
    ? childNode.insertBefore(beforeChild)
    : childNode.appendTo(parentNode);
}
