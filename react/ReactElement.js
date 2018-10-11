// 虚拟dom模型
export default function ReactElement(type, props, keys) {
    this.type = type;
    this.props = props;
    this.keys = keys;
  }