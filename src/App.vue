<template>
  <div id="app">
    <keep-alive>   <!--视图被缓存不被销毁，避免重新渲染-->
      <router-view/>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>
  import MainTabBar from "components/content/mainTabbar/MainTabBar";
  export default {
    name: 'App',
    components: {
      MainTabBar
    }
  }
</script>
<style>
  @import "assets/css/base.css";
</style>
