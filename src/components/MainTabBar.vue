<template>
  <tab-bar>
    <tab-bar-item path="/home" activeColor="#25a735">
      <img slot="item-icon" src="../assets/image/tabbar/home.svg" alt="" >
      <img slot="item-icon-active" src="../assets/image/tabbar/home_active.svg" alt="" >
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/shopping" activeColor="#25a735">
      <img slot="item-icon" src="../assets/image/tabbar/shopping.svg" alt="" >
      <img slot="item-icon-active" src="../assets/image/tabbar/shopping_active.svg" alt="" >
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/category" activeColor="#25a735">
      <img slot="item-icon" src="../assets/image/tabbar/category.svg" alt="" >
      <img slot="item-icon-active" src="../assets/image/tabbar/category_active.svg" alt="" >
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="#25a735">
      <img slot="item-icon" src="../assets/image/tabbar/profile.svg" alt="" >
      <img slot="item-icon-active" src="../assets/image/tabbar/profile_active.svg" alt="" >
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  import TabBar from "./tabbar/TabBar";
  import TabBarItem from "./tabbar/TabBarItem";
  export default {
    name: "MainTabBar",
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>