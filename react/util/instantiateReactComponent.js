import ReactDOMComponent from "../ReactDOMComponent";
import ReactDOMTextComponent from "../ReactDOMTextComponent";
import ReactCompositeComponent from "../ReactCompositeComponent";

/**
 * 根据元素类型实例化一个具体的component
 * @param {*} node ReactElement
 * @return {*} 返回一个具体的component实例
 */
function instantiateReactComponent(node) {
  // 在这里我们不针对空类型元素做处理
  if (typeof node === "string" || typeof node === "number") {
    // 文本类型组件
    return new ReactDOMTextComponent(node);
  } else if (typeof node === "object" && typeof node.type === "string") {
    // 标签类型元素组件
    return new ReactDOMComponent(node);
  } else if (typeof node === "object" && typeof node.type === "function") {
    // 自定义类型组件
    return new ReactCompositeComponent(node);
  }
}

export default instantiateReactComponent;
