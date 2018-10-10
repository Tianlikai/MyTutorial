class Event {
  on(key, listener) {
    if (!this.__events) {
      this.__events = {};
    }
    if (!this.__events[key]) {
      this.__events[key] = [];
    }
    if (
      this.__events[key].indexOf(listener) < 0 &&
      typeof listener === "function"
    ) {
      this.__events[key].push(listener);
    }
    return this;
  }

  notice(key) {
    if (!this.__events || !this.__events[key]) return null;
    var args = Array.prototype.slice.call(arguments, 1) || [];

    var listeners = this.__events[key];
    var i = 0;
    var l = listeners.length;

    for (; i < l; ++i) {
      listeners[i].apply(this, args);
    }
    return this;
  }

  off(key, listener) {
    if (!key && !listener) {
      this.__events = {};
    }
    if (key && !listener) {
      delete this.__events[key];
    }
    if (key && listener) {
      var listeners = this.__events[key];
      var index = listeners.indexOf[listener];
      listeners.splice(index, 1);
    }
    return this;
  }
}

class ComponentBase extends Event {
  constructor(config) {
    super();
    this.__config = config;
    this.bind && this.bind();
    this.render && this.render();
  }

  set(key, value) {
    this.__config[key] = value;
  }

  get(key) {
    return this.__config[key];
  }

  destroy() {
    this.off();
  }
}

class Component extends ComponentBase {
  constructor(config, EVENTS, template) {
    super(config);
    this.EVENTS = EVENTS || {};
    this.template = template || "";
    // this.__config = config;
    this._delegateEvent();
    this.setUp();
  }
  _delegateEvent() {
    var self = this;
    var events = this.EVENTS || {};
    var eventObjs, fn, select, type;
    var parentNode = this.get("parentNode") || $(document.body);

    for (select in events) {
      eventObjs = events[select];

      for (type in eventObjs) {
        fn = eventObjs[type];

        parentNode.delegate(select, type, function(e) {
          fn.call(null, self, e);
        });
      }
    }
  }
  _parseTemplate(str, data) {
    var fn = new Function(
      "obj",
      "var p=[],print=function(){p.push.apply(p,arguments);};" +
        "with(obj){p.push('" +
        str
          .replace(/[\r\t\n]/g, " ")
          .split("<%")
          .join("\t")
          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)%>/g, "',$1,'")
          .split("\t")
          .join("');")
          .split("%>")
          .join("p.push('")
          .split("\r")
          .join("\\'") +
        "');}return p.join('');"
    );
    return data ? fn(data) : fn;
  }
  setUp() {
    this.render();
  }
  setChuckdata(key, value) {
    var self = this;
    var data = self.get("__renderData");

    //更新对应的值
    data[key] = value;

    if (!this.template) return;
    //重新渲染
    var newHtmlNode = $(self._parseTemplate(this.template, data));
    //拿到存储的渲染后的节点
    var currentNode = self.get("__currentNode");
    if (!currentNode) return;
    //替换内容
    currentNode.replaceWith(newHtmlNode);

    self.set("__currentNode", newHtmlNode);
  }
  render(data) {
    var self = this;
    //先存储起来渲染的data,方便后面setChuckdata获取使用
    self.set("__renderData", data);

    if (!this.template) return;

    //使用_parseTemplate解析渲染模板生成html
    //子类可以覆盖这个方法使用其他的模板引擎解析
    var html = self._parseTemplate(this.template, data);

    var parentNode = this.get("parentNode") || $(document.body);

    var currentNode = $(html);
    //保存下来留待后面的区域刷新
    //存储起来，方便后面setChuckdata获取使用
    self.set("__currentNode", currentNode);
    parentNode.append(currentNode);
  }
  destroy() {
    var self = this;
    //去掉自身的事件监听
    self.off();
    //删除渲染好的dom节点
    self.get("__currentNode").remove();
    //去掉绑定的代理事件
    var events = self.EVENTS || {};
    var eventObjs, fn, select, type;
    var parentNode = self.get("parentNode");

    for (select in events) {
      eventObjs = events[select];

      for (type in eventObjs) {
        fn = eventObjs[type];

        parentNode.undelegate(select, type, fn);
      }
    }
  }
}

class TextCount extends Component {
  constructor(config) {
    var template = '<span id="J_input_count"><%= count %>个字</span>';
    var EVENTS = {
      // 选择器字符串，支持所有jQuery风格的选择器
      input: {
        // 注册keyup事件
        keyup: function(self, e) {
          console.log(self._getNum());
          // 单向绑定，修改数据直接更新对应模板
          self.setChuckdata("count", self._getNum());
        }
      }
    };
    super(config, EVENTS, template);
  }
  _getNum() {
    return this.get("input").val().length || 0;
  }

  setUp() {
    var input = this.get("parentNode").find("#J_input");
    this.set("input", input);

    var num = this._getNum();

    // 赋值数据，渲染模板，选用。有的组件没有对应的模板就可以不调用这步。
    this.render({
      count: num
    });
  }
}
