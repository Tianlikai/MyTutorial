/**
 * 将数组转换为映射
 * @param {Array} componentChildren
 * @return {object} 返回一个映射
 */
function flattenChildren(componentChildren) {
  var name;
  var childMap = {};
  componentChildren &&
    componentChildren.forEach((child, i) => {
      // 一个组件下的子节点没有给定key值，则去下标作为标识
      name =
        child && child._currentElement && child._currentElement.key
          ? child._currentElement.key
          : i.toString(32);
      childMap[name] = child;
    });
  return childMap;
}

export default flattenChildren;
