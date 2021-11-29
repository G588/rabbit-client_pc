<template>
  <div class="sub-sort">
    <div class="sort">
      <a
        :class="{ active: sortRef.sortField === '' }"
        href="javascript:"
        @click="updateSortRef({ sortField: '', sortMethod: 'desc' })"
        >默认排序</a
      >
      <a
        :class="{ active: sortRef.sortField === 'publishTime' }"
        href="javascript:"
        @click="updateSortRef({ sortField: 'publishTime' })"
        >最新商品</a
      >
      <a
        :class="{ active: sortRef.sortField === 'orderNum' }"
        href="javascript:"
        @click="updateSortRef({ sortField: 'orderNum' })"
        >最高人气</a
      >
      <a
        :class="{ active: sortRef.sortField === 'evaluateNum' }"
        href="javascript:"
        @click="
          updateSortRef({
            sortField: 'evaluateNum',
          })
        "
        >评论最多</a
      >
      <a
        href="javascript:"
        @click="
          updateSortRef({
            sortField: 'price',
            sortMethod: sortRef.sortMethod === 'desc' ? 'asc' : 'desc',
          })
        "
      >
        价格排序
        <i
          :class="{ active: sortRef.sortMethod === 'asc' }"
          class="arrow up"
        ></i>
        <i
          :class="{ active: sortRef.sortMethod === 'desc' }"
          class="arrow down"
        ></i>
      </a>
    </div>
    <div class="check">
      <XtxCheckbox
        v-model="sortRef.inventory"
        @update:modelVaue="updateSortRef({ inventory: $event })"
        >仅显示有货商品
      </XtxCheckbox>
      <XtxCheckbox
        v-model="sortRef.onlyDiscount"
        @update:modelVaue="updateSortRef({ onlyDiscount: $event })"
        >仅显示特惠商品
      </XtxCheckbox>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";

export default {
  name: "SubSort",
  setup(props, { emit }) {
    const { sortRef, updateSortRef } = sortFn(emit);
    return { sortRef, updateSortRef };
  },
};

// 排序条件函数
function sortFn(emit) {
  // 获取排序条件
  const sortRef = ref({
    sortField: "",
    sortMethod: "desc",
    inventory: false,
    onlyDiscount: false,
  });
  // 更新排序方法
  const updateSortRef = (target) => {
    sortRef.value = {
      ...sortRef.value,
      ...target,
    };
    // console.log(sortRef.value);
    //传给父组件
    emit("subSortData", sortRef.value);
  };
  return { sortRef, updateSortRef };
}
</script>
<style lang="less" scoped>
.sub-sort {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .sort {
    display: flex;

    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all 0.3s;

      &.active {
        background: @xtxColor;
        border-color: @xtxColor;
        color: #fff;
      }

      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;

        &.up {
          top: 3px;
          border-bottom-color: #bbb;

          &.active {
            border-bottom-color: @xtxColor;
          }
        }

        &.down {
          top: 15px;
          border-top-color: #bbb;

          &.active {
            border-top-color: @xtxColor;
          }
        }
      }
    }
  }

  .check {
    .xtx-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>
