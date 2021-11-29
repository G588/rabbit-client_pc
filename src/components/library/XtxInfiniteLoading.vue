<template>
  <div ref="target" class="xtx-infinite-loading">
    <div v-if="loading" class="loading">
      <span class="img"></span>
      <span class="text">正在加载...</span>
    </div>
    <div v-if="finished" class="none">
      <span class="img"></span>
      <span class="text">亲，没有更多了</span>
    </div>
  </div>
</template>
<script>
import { useIntersectionObserver } from "@vueuse/core";
import { ref } from "vue";

export default {
  name: "XtxInfiniteLoading",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    finished: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    console.log(`${props.loading}--useIntersectionObserver`);
    // 被监听的元素
    const target = ref();
    // 是否进入可视区
    useIntersectionObserver(target, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        // 判断没有`正在加载...`并且没有显示`没有更多`
        if (!props.loading && !props.finished) {
          console.log("进入可视区");
          // 通过自定义事件告诉父组件到达了可视区域
          emit("infinite");
        }
      }
    });

    return { target };
  },
};
</script>
<style lang="less" scoped>
.xtx-infinite-loading {
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;

    .img {
      width: 50px;
      height: 50px;
      background: url(../../assets/images/load.gif) no-repeat center / contain;
    }

    .text {
      color: #999;
      font-size: 16px;
    }
  }

  .none {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;

    .img {
      width: 200px;
      height: 134px;
      background: url(../../assets/images/none.png) no-repeat center / contain;
    }

    .text {
      color: #999;
      font-size: 16px;
    }
  }
}
</style>
