// 获取轮播图数据
import { ref } from "vue";
import { getBanners } from "@/api/home";

export default function useBanners() {
  // 设置一个存储轮播图数据的变量
  const bannersData = ref();
  const getData = () => {
    // 发送请求
    getBanners().then((data) => {
      bannersData.value = data.result;
    });
  };
  return { bannersData, getData };
}
