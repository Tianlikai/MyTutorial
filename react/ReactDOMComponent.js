import flattenChildren from "./util/flattenChildren";
import generateComponentChildren from "./util/generateComponentChildren";
import instantiateReactComponent from "./util/instantiateReactComponent";

/**
 * component 类
 * react 基础标签类型，类似与html中的（'div','span' 等）
 * @param {*} element 基础元素
 */
function ReactDOMComponent(element) {
  this._currentElement = element;
  this._rootNodeID = null;
}

/**
 * component 类 装载方法
 * @param {*} rootID 元素id
 * @param {string} 返回dom
 */
ReactDOMComponent.prototype.mountComponent = function(rootID) {
  this._rootNodeID = rootID;
  var props = this._currentElement.props;

  // 外层标签
  var tagOpen = `<${this._currentElement.type} data-reactid="${
    this._rootNodeID
  }"`;
  var tagClose = `</${this._currentElement.type}>`;

  // 拼接标签属性
  for (var propName in props) {
    // 属性为绑定事件
    if (/^on[A-Za-z]/.test(propName)) {
      var eventType = propName.replace("on", "");
      // 对当前节点添加事件代理
      $(document).delegate(
        `[data-reactid="${this._rootNodeID}"]`,
        `${eventType}.${this._rootNodeID}`,
        props[propName]
      );
    }

    // 对于props 上的children和事件属性不做处理
    if (
      props[propName] &&
      propName !== "children" &&
      !/^on[A-Za-z]/.test(propName)
    ) {
      tagOpen += ` ${propName}=${props[propName]}`;
    }
  }
  // 渲染子节点dom
  var content = "";
  var children = props.children || [];
  var childrenInstance = []; // 保存子节点component 实例

  children.forEach((child, key) => {
    var childComponentInstance = instantiateReactComponent(child);
    // 为子节点添加标记
    childComponentInstance._mountIndex = key;
    childrenInstance.push(childComponentInstance);

    var childMarkup = childComponentInstance.mountComponent(
      `${this._rootNodeID}.${key}`
    );

    // 拼接子节点dom
    content += childMarkup;
  });

  // 保存component 实例
  this._renderedChildren = childrenInstance;

  return tagOpen + ">" + content + tagClose;
};

/**
 * component 类 更新
 * @param {*} nextElement
 */
ReactDOMComponent.prototype.receiveComponent = function(nextElement) {
  var lastProps = this._currentElement.props;
  var nextProps = nextElement.props;
  this._currentElement = nextElement;
  // 处理当前节点的属性
  this._updateDOMProperties(lastProps, nextProps);
  // 处理当前节点的子节点变动
  this._updateDOMChildren(nextElement.props.children);
};

/**
 *
 * @param {*} lastProps
 * @param {*} nextProps
 */
ReactDOMComponent.prototype._updateDOMProperties = function(
  lastProps,
  nextProps
) {
  // 当老属性不在新属性的集合里时，需要删除属性
  var propName;
  for (propName in lastProps) {
    if (
      nextProps.hasOwnProperty(propName) &&
      !lastProps.hasOwnProperty(propName)
    ) {
      // 新属性中有，且不再老属性的原型中
      continue;
    }
    if (/^on[A-Za-z]/.test(propName)) {
      var eventType = propName.replace("on", "");
      // 特殊事件，需要去掉事件监听
      $(document).undelegate(
        `[data-reactid="${this._rootNodeID}"]`,
        eventType,
        lastProps[propName]
      );
      continue;
    }
    // 删除不需要的属性
    $(`[data-reactid="${this._rootNodeID}"]`).removeAttr(propName);
  }
  // 对于新的事件，需要写到dom上
  for (propName in nextProps) {
    if (propName === "children") continue;

    if (/^on[A-Za-z]/.test(propName)) {
      var eventType = propName.replace("on", "");
      // 删除老的事件绑定
      lastProps[propName] &&
        $(document).undelegate(
          `[data-reactid="${this._rootNodeID}"]`,
          eventType,
          lastProps[propName]
        );
      // 重新绑定
      $(document).delegate(
        `[data-reactid="${this._rootNodeID}"]`,
        eventType,
        nextProps[propName]
      );
      continue;
    }

    // 添加新的属性，重写同名属性
    $(`[data-reactid="${this._rootNodeID}"]`).prop(
      propName,
      nextProps[propName]
    );
  }
};

// 全局的更新深度标识
var updateDepth = 0;
// 全局的更新队列，所有的差异都存在这里
var diffQueue = [];

//差异更新的几种类型
var UPDATE_TYPES = {
  MOVE_EXISTING: 1,
  REMOVE_NODE: 2,
  INSERT_MARKUP: 3
};

/**
 * _diff用来递归找出差别,组装差异对象,添加到更新队列diffQueue。
 * @param {*} diffQueue
 * @param {*} nextChildrenElements
 */
ReactDOMComponent.prototype._diff = function(diffQueue, nextChildrenElements) {
  var self = this;
  var prevChildren = flattenChildren(self._renderedChildren);

  //生成新的子节点的component对象集合，这里注意，会复用老的component对象
  var nextChildren = generateComponentChildren(
    prevChildren,
    nextChildrenElements
  );

  //重新赋值_renderedChildren，使用最新的。
  self._renderedChildren = [];
  for (let instance of nextChildren) {
    self._renderedChildren.push(instance);
  }

  /**注意新增代码**/
  var lastIndex = 0; //代表访问的最后一次的老的集合的位置

  var nextIndex = 0; //代表到达的新的节点的index
  //通过对比两个集合的差异，组装差异节点添加到队列中
  for (name in nextChildren) {
    if (!nextChildren.hasOwnProperty(name)) {
      continue;
    }
    var prevChild = prevChildren && prevChildren[name];
    var nextChild = nextChildren[name];
    //相同的话，说明是使用的同一个component,所以我们需要做移动的操作
    if (prevChild === nextChild) {
      //添加差异对象，类型：MOVE_EXISTING
      /**注意新增代码**/
      prevChild._mountIndex < lastIndex &&
        diffQueue.push({
          parentId: self._rootNodeID,
          parentNode: $("[data-reactid=" + self._rootNodeID + "]"),
          type: UPDATE_TYPES.MOVE_EXISTING,
          fromIndex: prevChild._mountIndex,
          toIndex: nextIndex
        });
      /**注意新增代码**/
      lastIndex = Math.max(prevChild._mountIndex, lastIndex);
    } else {
      //如果不相同，说明是新增加的节点
      //但是如果老的还存在，就是element不同，但是component一样。我们需要把它对应的老的element删除。
      if (prevChild) {
        //添加差异对象，类型：REMOVE_NODE
        diffQueue.push({
          parentId: self._rootNodeID,
          parentNode: $("[data-reactid=" + self._rootNodeID + "]"),
          type: UPDATE_TYPES.REMOVE_NODE,
          fromIndex: prevChild._mountIndex,
          toIndex: null
        });

        //如果以前已经渲染过了，记得先去掉以前所有的事件监听，通过命名空间全部清空
        if (prevChild._rootNodeID) {
          $(document).undelegate("." + prevChild._rootNodeID);
        }

        /**注意新增代码**/
        lastIndex = Math.max(prevChild._mountIndex, lastIndex);
      }
      //新增加的节点，也组装差异对象放到队列里
      //添加差异对象，类型：INSERT_MARKUP
      diffQueue.push({
        parentId: self._rootNodeID,
        parentNode: $("[data-reactid=" + self._rootNodeID + "]"),
        type: UPDATE_TYPES.INSERT_MARKUP,
        fromIndex: null,
        toIndex: nextIndex,
        markup: nextChild.mountComponent(self._rootNodeID + "." + name) //新增的节点，多一个此属性，表示新节点的dom内容
      });
    }
    //更新mount的index
    nextChild._mountIndex = nextIndex;
    nextIndex++;
  }

  //对于老的节点里有，新的节点里没有的那些，也全都删除掉
  for (name in prevChildren) {
    if (
      prevChildren.hasOwnProperty(name) &&
      !(nextChildren && nextChildren.hasOwnProperty(name))
    ) {
      //添加差异对象，类型：REMOVE_NODE
      diffQueue.push({
        parentId: self._rootNodeID,
        parentNode: $("[data-reactid=" + self._rootNodeID + "]"),
        type: UPDATE_TYPES.REMOVE_NODE,
        fromIndex: prevChildren[name]._mountIndex,
        toIndex: null
      });
      //如果以前已经渲染过了，记得先去掉以前所有的事件监听
      if (prevChildren[name]._rootNodeID) {
        $(document).undelegate("." + prevChildren[name]._rootNodeID);
      }
    }
  }
};

/**
 *
 * @param {*} diffQueue
 */
ReactDOMComponent.prototype._patch = function(updates) {
  var update;
  var initialChildren = {};
  var deleteChildren = [];

  for (var i = 0; i < updates.length; i++) {
    update = updates[i];
    if (
      update.type === UPDATE_TYPES.MOVE_EXISTING ||
      update.type === UPDATE_TYPES.REMOVE_NODE
    ) {
      var updatedIndex = update.fromIndex;
      var updatedChild = $(update.parentNode.children().get(updatedIndex));
      var parentId = update.parentId;

      // 所有需要更新的节点都保存下来，方便后面使用
      initialChildren[parentId] = initialChildren[parentId] || [];
      // 使用parentID作为简易命名空间
      initialChildren[parentId][updatedIndex] = updatedChild;

      // 所有需要修改的节点先删除,对于move的，后面再重新插入到正确的位置即可
      deleteChildren.push(updatedChild);
    }
  }

  // 删除所有需要先删除的
  deleteChildren.forEach((child, i) => {
    $(child).remove();
  });

  //再遍历一次，这次处理新增的节点，还有修改的节点这里也要重新插入
  for (var k = 0; k < updates.length; k++) {
    update = updates[k];
    switch (update.type) {
      case UPDATE_TYPES.INSERT_MARKUP:
        insertChildAt(update.parentNode, $(update.markup), update.toIndex);
        break;
      case UPDATE_TYPES.MOVE_EXISTING:
        insertChildAt(
          update.parentNode,
          initialChildren[update.parentId][update.fromIndex],
          update.toIndex
        );
        break;
      case UPDATE_TYPES.REMOVE_NODE:
        // 什么都不需要做，因为上面已经帮忙删除掉了
        break;
    }
  }
};

/**
 * 更新children
 * @param {*} nextChildrenElements
 */
ReactDOMComponent.prototype._updateDOMChildren = function(
  nextChildrenElements
) {
  updateDepth++;
  this._diff(diffQueue, nextChildrenElements);
  updateDepth--;
  if (updateDepth === 0) {
    this._patch(diffQueue);
    diffQueue = [];
  }
};

export default ReactDOMComponent;
