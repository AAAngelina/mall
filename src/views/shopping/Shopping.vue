<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  import { mapGetters } from 'vuex'

  export default {
    name: "Shopping",
    components: {
      NavBar
    },
    computed: {
      ...mapGetters(['cartLength','cartList'])  /*解构getters,映射为计算属性*/
    }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #ffffff;
  }
</style>
