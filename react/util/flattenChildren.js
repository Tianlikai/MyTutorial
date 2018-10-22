/**
 * 将数组转换为映射
 * @param {Array} componentChildren
 */
function flattenChildren(componentChildren) {
  var name;
  var childMap = {};
  componentChildren &&
    componentChildren.forEach((child, i) => {
      name =
        child && child._currentElement && child._currentElement.key
          ? child._currentElement.key
          : i.toString(32);
      childMap[name] = child;
    });
  return childMap;
}

export default flattenChildren;
