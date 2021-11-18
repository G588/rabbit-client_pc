import { onMounted, onUnmounted, ref } from "vue";

export default function useScrollTop() {
  // 存储滚高距离
  const scrollTop = ref(0);
  //  滚动事件的事件处理函数
  const onScrollTop = () => {
    // 存储滚动距离
    scrollTop.value = document.documentElement.scrollTop;
  };
  // 组件挂载完成
  onMounted(() => {
    window.addEventListener("scroll", onScrollTop);
  });
  // 组件卸载完成
  onUnmounted(() => {
    window.removeEventListener("scroll", onScrollTop);
  });
  return scrollTop;
}
