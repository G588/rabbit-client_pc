<template>
  <HomePanel title="人气推荐" sub-title="人气爆款 不容错过" ref="target">
    <ul class="goods-list" v-if="hotData">
      <li v-for="item in hotData" :key="item.id">
        <RouterLink to="/">
          <img :src="item.picture" alt="" />
          <p class="name">{{ item.title }}</p>
          <p class="desc">{{ item.alt }}</p>
        </RouterLink>
      </li>
    </ul>
    <!--添加动画-->
    <transition name="fade">
      <HomeSkeleton v-if="!hotData" />
    </transition>
  </HomePanel>
</template>

<script>
import HomePanel from "@/views/home/components/HomePanel";
import { getNewHots } from "@/api/home";
import useLazyData from "@/hooks/useLazyData";
import HomeSkeleton from "@/views/home/components/HomeSkeleton";
export default {
  name: "HomeHot",
  components: { HomeSkeleton, HomePanel },
  setup() {
    const { target, result: hotData } = useLazyData(getNewHots);
    return { target, hotData };
  },
};
//
// function getHot() {
//   // 定义存储人气推荐的数据
//   const hotData = ref();
//   // 发起请求
//   const getData = () => {
//     getNewHots().then((data) => {
//       hotData.value = data.result;
//     });
//   };
//
//   return {
//     hotData,
//     getData,
//   };
// }
</script>
<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
