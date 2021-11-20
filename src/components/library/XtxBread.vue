<script>
import { h } from "vue";

export default {
  name: "XtxBrend",
  // 使用渲染函数
  render() {
    // 获取插槽内容
    const items = this.$slots.default();
    // 存储子组件内容
    const result = [];
    // 遍历插槽内容
    items.forEach((item, index) => {
      result.push(item);
      // 判断是不是最后一项
      if (index < items.length - 1) {
        // 添加i标签
        result.push(h("i", { class: "iconfont icon-angle-right" }));
      }
    });
    // 渲染最外层div
    return h("div", { class: "xtx-bread" }, result);
  },
};
</script>

<style scoped lang="less">
.xtx-bread {
  display: flex;
  padding: 25px 10px;
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
