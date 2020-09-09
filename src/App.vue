<template>
  <div id="app">
    <router-view></router-view>
    <tab-bar>
      <tab-bar-item path="/home" activeColor="red">
        <img slot="item-icon" src="./assets/image/tabbar/home.svg" alt="" >
        <img slot="item-icon-active" src="./assets/image/tabbar/home_active.svg" alt="" >
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/shopping" activeColor="#9920A7">
        <img slot="item-icon" src="./assets/image/tabbar/shopping.svg" alt="" >
        <img slot="item-icon-active" src="./assets/image/tabbar/shopping_active.svg" alt="" >
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/category" activeColor="#358DA7">
        <img slot="item-icon" src="./assets/image/tabbar/category.svg" alt="" >
        <img slot="item-icon-active" src="./assets/image/tabbar/category_active.svg" alt="" >
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/profile" activeColor="blue">
        <img slot="item-icon" src="./assets/image/tabbar/profile.svg" alt="" >
        <img slot="item-icon-active" src="./assets/image/tabbar/profile_active.svg" alt="" >
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
  import TabBar from "./components/tabbar/TabBar";
  import TabBarItem from "./components/tabbar/TabBarItem";
  export default {
    name: 'App',
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>
<style>
  @import "./assets/css/base.css";
</style>
