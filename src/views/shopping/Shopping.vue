<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";

  import { mapGetters } from 'vuex'

  export default {
    name: "Shopping",
    components: {
      NavBar,
      CartList
    },
    computed: {
      ...mapGetters(['cartLength'])  /*解构getters,映射为计算属性*/
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #ffffff;
  }
</style>
