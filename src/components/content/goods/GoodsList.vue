<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :key="item.iid" :goods-item="item"/>
  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";
  export default {
    name: "GoodsList",
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      GoodsListItem
    }
  }
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;  /*包裹，根据元素的宽度，决定一行显示几个*/
    justify-content: space-around;  /*中间均等分，左右两边为中间的1/2*/
    padding: 3px;  /*微调*/
  }

</style>
