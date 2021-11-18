import defaultImage from "@/assets/images/200.png";
const lazy = {
  // 组件渲染时执行
  mounted(el, binding) {
    // el 元素
    // binding 值
    const observer = new IntersectionObserver(([{ isIntersecting }]) => {
      // 到达可视区
      if (isIntersecting) {
        // 停止
        observer.unobserve(el);
        // 加载图片
        el.src = binding.value;
        // 图片加载错误时加载默认图片
        el.onerror = function () {
          console.log("图片加载错误");
          el.src = defaultImage;
        };
      }
    });
    // 指定要监听的元素
    observer.observe(el);
  },
};

export default lazy;
