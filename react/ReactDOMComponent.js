import {
  instantiateReactComponent,
  _shouldUpdateReactComponent
} from "./React";

// 全局更新深度标识
var updateDepth = 0;
// 全局更新队列，保存所有差异
var diffQueue = [];

// diff 更新类型
var UPDATE_TYPES = {
  MOVE_EXISTING: 1,
  REMOVE_NODE: 2,
  INSERT_MARKUP: 3
};

/**
 * 将数组children 改为map
 * map 的 key 就是 element 的key
 * 如果为 text 元素 或者没有 key 值，则key为数组下标
 * @param {array} componentChildren
 * @return {object}
 */
function flattenChildren(componentChildren) {
  var child;
  var name;
  var childrenMap = {};
  for (var i = 0; i < componentChildren.length; i++) {
    child = componentChildren[i];
    name =
      child && child._currentelement && child._currentelement.key
        ? child._currentelement.key
        : i.toString(36);
    childrenMap[name] = child;
  }
  return childrenMap;
}

/**
 * 生成一个子节点elements map
 * @param {*} prevChildren
 * @param {*} nextChildrenElements
 * @return {object}
 */
function generateComponentChildren(prevChildren, nextChildrenElements) {
  var nextChildren = {};
  nextChildrenElements = nextChildrenElements || [];
  $.each(nextChildrenElements, function(index, element) {
    var name = element.key ? element.key : index;
    var prevChild = prevChildren && prevChildren[name];
    var prevElement = prevChild && prevChild._currentElement;
    var nextElement = element;
    //调用_shouldUpdateReactComponent判断是否是更新
    if (_shouldUpdateReactComponent(prevElement, nextElement)) {
      //更新的话直接递归调用子节点的receiveComponent就好了
      prevChild.receiveComponent(nextElement);
      //然后继续使用老的component
      nextChildren[name] = prevChild;
    } else {
      //对于没有老的，那就重新新增一个，重新生成一个component
      var nextChildInstance = instantiateReactComponent(nextElement, null);
      //使用新的component
      nextChildren[name] = nextChildInstance;
    }
  });
  return nextChildren;
}

//用于将childNode插入到指定位置
function insertChildAt(parentNode, childNode, index) {
  var beforeChild = parentNode.children().get(index);
  beforeChild
    ? childNode.insertBefore(beforeChild)
    : childNode.appendTo(parentNode);
  // var beforeChild = index >= parentNode.childNodes.length ? null : parentNode.childNodes.item(index);
  // parentNode.insertBefore(childNode, beforeChild);
}

// ReactDOMComponent
function ReactDOMComponent(element) {
  this._currentElement = element;
  this._rootNodeID = null;
}

// 首次装载
ReactDOMComponent.prototype.mountComponent = function(rootID) {
  //赋值标识
  this._rootNodeID = rootID;
  var props = this._currentElement.props;
  var tagOpen = "<" + this._currentElement.type;
  var tagClose = "</" + this._currentElement.type + ">";
  //加上reactid标识
  tagOpen += " data-reactid=" + this._rootNodeID;
  //拼凑出属性
  for (var propKey in props) {
    //这里要做一下事件的监听，就是从属性props里面解析拿出on开头的事件属性的对应事件监听
    if (/^on[A-Za-z]/.test(propKey)) {
      var eventType = propKey.replace("on", "");
      //针对当前的节点添加事件代理,以_rootNodeID为命名空间
      $(document).delegate(
        '[data-reactid="' + this._rootNodeID + '"]',
        eventType + "." + this._rootNodeID,
        props[propKey]
      );
    }
    //对于children属性以及事件监听的属性不需要进行字符串拼接
    //事件会代理到全局。这边不能拼到dom上不然会产生原生的事件监听
    if (
      props[propKey] &&
      propKey != "children" &&
      !/^on[A-Za-z]/.test(propKey)
    ) {
      tagOpen += " " + propKey + "=" + props[propKey];
    }
  }
  //获取子节点渲染出的内容
  var content = "";
  var children = props.children || [];
  var childrenInstances = []; //用于保存所有的子节点的componet实例，以后会用到
  var that = this;
  $.each(children, function(key, child) {
    //这里再次调用了instantiateReactComponent实例化子节点component类，拼接好返回
    var childComponentInstance = instantiateReactComponent(child);
    childComponentInstance._mountIndex = key;
    childrenInstances.push(childComponentInstance);
    //子节点的rootId是父节点的rootId加上新的key也就是顺序的值拼成的新值
    var curRootId = that._rootNodeID + "." + key;
    //得到子节点的渲染内容
    var childMarkup = childComponentInstance.mountComponent(curRootId);
    //拼接在一起
    content += " " + childMarkup;
  });
  //留给以后更新时用的这边先不用管
  this._renderedChildren = childrenInstances;
  //拼出整个html内容
  return tagOpen + ">" + content + tagClose;
};

/**
 * 更新
 * 基本元素更新
 * 1: 属性更新（特殊属性，事件处理）
 * 2: 子节点更新
 *    diff  拿新的子节点树跟以前老的子节点树对比，找出他们之间的差别。
 *    patch 所有差别找出后，再一次性的去更新。
 * @param {*} nextElement
 */
ReactDOMComponent.prototype.receiveComponent = function(nextElement) {
  var lastProps = this._currentElement.props;
  var nextProps = nextElement.props;
  this._currentElement = nextElement;
  //需要单独的更新属性
  this._updateDOMProperties(lastProps, nextProps);
  //再更新子节点
  this._updateDOMChildren(nextElement.props.children);
};

/**
 * 更新属性
 * @param {*} lastProps
 * @param {*} nextProps
 */
ReactDOMComponent.prototype._updateDOMProperties = function(
  lastProps,
  nextProps
) {
  var propKey;
  //遍历，当一个老的属性不在新的属性集合里时，需要删除掉。
  for (propKey in lastProps) {
    //新的属性里有，或者propKey是在原型上的直接跳过。这样剩下的都是不在新属性集合里的。需要删除
    if (
      nextProps.hasOwnProperty(propKey) ||
      !lastProps.hasOwnProperty(propKey)
    ) {
      continue;
    }
    //对于那种特殊的，比如这里的事件监听的属性我们需要去掉监听
    if (/^on[A-Za-z]/.test(propKey)) {
      var eventType = propKey.replace("on", "");
      //针对当前的节点取消事件代理
      $(document).undelegate(
        '[data-reactid="' + this._rootNodeID + '"]',
        eventType,
        lastProps[propKey]
      );
      continue;
    }
    //从dom上删除不需要的属性
    $('[data-reactid="' + this._rootNodeID + '"]').removeAttr(propKey);
  }
  //对于新的属性，需要写到dom节点上
  for (propKey in nextProps) {
    //对于事件监听的属性我们需要特殊处理
    if (/^on[A-Za-z]/.test(propKey)) {
      var eventType = propKey.replace("on", "");
      //以前如果已经有，说明有了监听，需要先去掉
      lastProps[propKey] &&
        $(document).undelegate(
          '[data-reactid="' + this._rootNodeID + '"]',
          eventType,
          lastProps[propKey]
        );
      //针对当前的节点添加事件代理,以_rootNodeID为命名空间
      $(document).delegate(
        '[data-reactid="' + this._rootNodeID + '"]',
        eventType + "." + this._rootNodeID,
        nextProps[propKey]
      );
      continue;
    }
    if (propKey == "children") continue;
    //添加新的属性，或者是更新老的同名属性
    $('[data-reactid="' + this._rootNodeID + '"]').prop(
      propKey,
      nextProps[propKey]
    );
  }
};

/**
 * 更新子节点
 * @param {*} children
 */
ReactDOMComponent.prototype._updateDOMChildren = function(
  nextChildrenElements
) {
  updateDepth++;
  //_diff用来递归找出差别,组装差异对象,添加到更新队列diffQueue。
  this._diff(diffQueue, nextChildrenElements);
  updateDepth--;
  if (updateDepth == 0) {
    //在需要的时候调用patch，执行具体的dom操作
    this._patch(diffQueue);
    diffQueue = [];
  }
};

//_diff用来递归找出差别,组装差异对象,添加到更新队列diffQueue。
//_diff用来递归找出差别,组装差异对象,添加到更新队列diffQueue。
ReactDOMComponent.prototype._diff = function(diffQueue, nextChildrenElements) {
  var self = this;
  //拿到之前的子节点的 component类型对象的集合,这个是在刚开始渲染时赋值的，记不得的可以翻上面
  //_renderedChildren 本来是数组，我们搞成map
  var prevChildren = flattenChildren(self._renderedChildren);
  //生成新的子节点的component对象集合，这里注意，会复用老的component对象
  var nextChildren = generateComponentChildren(
    prevChildren,
    nextChildrenElements
  );
  //重新赋值_renderedChildren，使用最新的。
  self._renderedChildren = [];
  $.each(nextChildren, function(key, instance) {
    self._renderedChildren.push(instance);
  });
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
        markup: nextChild.mountComponent() //新增的节点，多一个此属性，表示新节点的dom内容
      });
      //如果以前已经渲染过了，记得先去掉以前所有的事件监听
      if (prevChildren[name] && prevChildren[name]._rootNodeID) {
        $(document).undelegate("." + prevChildren[name]._rootNodeID);
      }
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
        fromIndex: prevChild._mountIndex,
        toIndex: null
      });
    }
  }
};

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
      var parentID = update.parentID;
      //所有需要更新的节点都保存下来，方便后面使用
      initialChildren[parentID] = initialChildren[parentID] || [];
      //使用parentID作为简易命名空间
      initialChildren[parentID][updatedIndex] = updatedChild;
      //所有需要修改的节点先删除,对于move的，后面再重新插入到正确的位置即可
      deleteChildren.push(updatedChild);
    }
  }
  //删除所有需要先删除的
  $.each(deleteChildren, function(index, child) {
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
          initialChildren[update.parentID][update.fromIndex],
          update.toIndex
        );
        break;
      case UPDATE_TYPES.REMOVE_NODE:
        // 什么都不需要做，因为上面已经帮忙删除掉了
        break;
    }
  }
};

export default ReactDOMComponent;
