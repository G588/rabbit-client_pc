<template>
  <LayoutTemplate>
    <div class="container">
      <!--左侧分类-->
      <HomeCategory />
      <!--轮播图-->
      <HomeBanner />
      <!--新鲜好物-->
      <HomeNew />
      <!--人气推荐-->
      <HomeHot />
      <!-- 热门品牌-->
      <HomeBrand />
      <!--产品区块-->
      <HomeProduct />
    </div>
  </LayoutTemplate>
</template>
<script>
import LayoutTemplate from "../../components/AppLayout";
import HomeCategory from "@/views/home/components/HomeCategory";
import HomeBanner from "@/views/home/components/HomeBanner";
import HomeNew from "@/views/home/components/HomeNew";
import HomeHot from "@/views/home/components/HomeHot";
import HomeBrand from "@/views/home/components/HomeBrand";
import HomeProduct from "@/views/home/components/HomeProduct";
export default {
  name: "HomePage",
  components: {
    HomeProduct,
    HomeBrand,
    HomeHot,
    HomeNew,
    HomeBanner,
    HomeCategory,
    LayoutTemplate,
  },
};
</script>
<style lang="less" scoped>
.box {
  color: @xtxColor;
}
</style>
