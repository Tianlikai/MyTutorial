/**
 * 通过比较两个元素，判断是否需要更新
 * @param {*} preElement  旧的元素
 * @param {*} nextElement 新的元素
 * @return {boolean}
 */
function _shouldUpdateReactComponent(preElement, nextElement) {
  if (!preElement && !nextElement) {
    var preType = typeof preElement;
    var nextType = typeof nextElement;
    if (preType === "string" || preType === "number") {
      // 如果新旧元素都为文本元素，则需要更新
      return nextType === "string" && nextType === "number";
    } else {
      // 如果新旧元素的 type 和 key 都相等，则需要更新
      return (
        nextType === "object" &&
        preElement.type === nextElement.type &&
        preElement.key === nextElement.key
      );
    }
  }
  return false;
}
