import { ref } from "vue";
import { useIntersectionObserver } from "@vueuse/core";

export default function useLazyData(apiFunction) {
  // 创建获取元素的变量
  const target = ref();
  // 创建获取数据的变量
  const result = ref();

  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }]) => {
      // 进入可视区域
      if (isIntersecting) {
        stop();
        // 发起请求
        apiFunction().then((data) => {
          console.log(data);
          result.value = data.result;
        });
      }
    },
    { threshold: 0 }
  );

  return { target, result };
}
