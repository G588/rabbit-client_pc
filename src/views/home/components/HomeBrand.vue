<template>
  <HomePanel title="热门品牌" subTitle="国际经典 品质保证" ref="target">
    <template v-slot:right>
      <a
        @click="toggle(-1)"
        href="javascript:"
        class="iconfont icon-angle-left prev"
      ></a>
      <a
        @click="toggle(1)"
        href="javascript:"
        class="iconfont icon-angle-right next"
      ></a>
    </template>
    <template v-slot:default>
      <div class="box">
        <ul
          class="list"
          :style="{ transform: `translateX(${-currentIndex * 1024}px)` }"
          v-if="hatbands"
        >
          <li v-for="item in hatbands" :key="item.id">
            <RouterLink to="/">
              <img :src="item.logo" alt="" />
            </RouterLink>
          </li>
        </ul>
        <!--添加动画-->
        <transition name="fade">
          <div v-if="!hatbands" class="skeleton">
            <xtx-skeleton
              class="item"
              v-for="i in 5"
              :key="i"
              animated="scroll"
              bg="#e4e4e4"
              width="240px"
              height="305px"
            />
          </div>
        </transition>
      </div>
    </template>
  </HomePanel>
</template>

<script>
import HomePanel from "@/views/home/components/HomePanel";
import useLazyData from "@/hooks/useLazyData";
import { getBrands } from "@/api/home";
import { ref } from "vue";
export default {
  name: "HomeBrand",
  components: { HomePanel },
  setup() {
    const limit = ref(10);
    const { target, result: hatbands } = useLazyData(() => {
      return getBrands(limit.value);
    });
    const { toggle, currentIndex } = useToggle();
    return { target, hatbands, currentIndex, toggle };
  },
};

// 抽取图片逻辑
function useToggle() {
  // 切换索引
  const currentIndex = ref(0);
  // 点击按钮实现左右切换
  const toggle = (count) => {
    // 设置变量存储计算索引
    const nuxtIndex = currentIndex.value + count;
    // 判断不存在的情况
    if (count > 1 || count < 0) return;
    // 正常返回索引
    currentIndex.value = nuxtIndex;
  };

  return { toggle, currentIndex };
}
</script>

<style scoped lang="less">
.home-panel {
  background: #f5f5f5;
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px;
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
.skeleton {
  width: 100%;
  display: flex;
  .item {
    margin-right: 10px;
    &:nth-child(5n) {
      margin-right: 0;
    }
  }
}
</style>
