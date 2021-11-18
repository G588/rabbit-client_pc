<template>
  <div class="xtx-carousel" @mouseenter="stop" @mouseleave="start">
    <ul class="carousel-body">
      <li
        :class="{ fade: index === currentIndex }"
        v-for="(item, index) in bannersData"
        :key="item.id"
        class="carousel-item"
      >
        <RouterLink :to="item.hrefUrl">
          <img :src="item.imgUrl" alt="" />
        </RouterLink>
      </li>
    </ul>
    <a @click="toggle(-1)" href="javascript:" class="carousel-btn prev"
      ><i class="iconfont icon-angle-left"></i
    ></a>
    <a @click="toggle(1)" href="javascript:" class="carousel-btn next"
      ><i class="iconfont icon-angle-right"></i
    ></a>
    <div class="carousel-indicator">
      <span
        @click="currentIndex = index"
        v-for="(item, index) in bannersData"
        :key="item.id"
        :class="{ active: index === currentIndex }"
      ></span>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from "vue";

export default {
  name: "XtxCarousel",
  props: {
    bannersData: {
      type: Array,
    },
    status: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      default: 3000,
    },
  },
  setup(props) {
    // 保存索引
    const currentIndex = ref(0);
    let timer = null;
    // 实现轮播图功能
    const toggle = (count) => {
      // 获取当前最新的索引
      const nextIndex = currentIndex.value + count;
      // 如果没有上一次索引
      if (nextIndex < 0) {
        // 显示最后一张
        currentIndex.value = props.bannersData.length - 1;
        // 如果没有下一次索引
      } else if (nextIndex > props.bannersData.length - 1) {
        // 显示第一张
        currentIndex.value = 0;
      } else {
        currentIndex.value = nextIndex;
      }
    };
    // 开启轮播图
    const start = () => {
      // 判断
      if (props.status && props.bannersData.length > 1) {
        timer = setInterval(() => {
          toggle(1);
        }, props.duration);
      }
    };
    // 停止轮播
    const stop = () => {
      clearInterval(timer);
    };
    // 组件挂载之后尝试开启定时器
    onMounted(start);
    // 组件销毁
    onUnmounted(stop);

    return { currentIndex, toggle, start, stop };
  },
};
</script>
<style scoped lang="less">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
