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
import useBanners from "@/hooks/useBanners";

export default {
  name: "HomeBanner",
  setup() {
    const { bannersData, getData } = useBanners();
    getData();
    return { bannersData };
  },
};
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
