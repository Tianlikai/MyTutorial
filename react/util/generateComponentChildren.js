import _shouldUpdateReactComponent from "./_shouldUpdateReactComponent";
import instantiateReactComponent from "./instantiateReactComponent";

/**
 * 生成子节点 elements 的 component 集合
 * @param {object} prevChildren 前一个 component 集合
 * @param {Array} nextChildrenElements 新传入的子节点element数组
 * @return {object} 返回一个映射
 */
function generateComponentChildren(prevChildren, nextChildrenElements) {
  // component 映射
  var nextChildren = {};

  nextChildrenElements = nextChildrenElements || [];
  nextChildrenElements.forEach((element, i) => {
    var name = element.key ? element.key : i;

    var prevChild = prevChildren[name];
    var prevElement = prevChild && prevChild._currentElement;

    var nextElement = element;

    // 判断新元素是否需要更新
    if (_shouldUpdateReactComponent(prevElement, nextElement)) {
      // 更新的话直接递归调用子节点的receiveComponent就好了
      prevChild.receiveComponent(nextElement);
      nextChildren[name] = prevChild;
    } else {
      // 对于全新的元素，重新生成一个component
      var nextChildrenInstance = instantiateReactComponent(nextElement);
      nextChildren[name] = nextChildrenInstance;
    }
  });
  return nextChildren;
}

export default generateComponentChildren;
