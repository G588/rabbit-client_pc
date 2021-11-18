<template>
  <!-- 调用应用级轮播图组件 -->
  <div class="home-banner">
    <XtxCarousel
      :bannersData="bannersData"
      :status="true"
      :duration="3000"
      v-if="bannersData"
    />
  </div>
</template>

<script>
import { getBanners } from "@/api/home";
import { ref } from "vue";

export default {
  name: "HomeBanner",
  setup() {
    const { bannersData, getData } = findBanners();
    getData();
    return { bannersData };
  },
};

// 获取轮播图数据
function findBanners() {
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
</script>

<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
  .xtx-carousel {
    :deep(.carousel-btn.prev) {
      left: 270px;
    }
    :deep(.carousel-indicator) {
      padding-left: 250px;
    }
  }
}
</style>
