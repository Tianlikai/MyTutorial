// 虚拟dom模型
export default function ReactElement(type, props, key) {
  this.type = type;
  this.props = props;
  this.key = key;
}
