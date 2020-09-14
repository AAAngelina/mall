<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"/>   <!--父传子-->
    <home-recommend-view :recommends="recommends"/>
    <home-feature-view/>
    <tab-control :titles="['流行','新款','精选']" class="tab-control"/>

    <ul>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
    </ul>
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";    /*子组件*/
  import HomeRecommendView from "./childComps/HomeRecommendView";
  import HomeFeatureView from "./childComps/HomeFeatureView";

  import NavBar from "../../components/common/navbar/NavBar";   /*公共组件*/
  import TabControl from "../../components/content/tabControl/TabControl";

  import {getHomeMultidata} from "../../network/home";   /*导入函数*/


  export default {
    name: "Home",
    components: {
      NavBar,
      TabControl,
      HomeSwiper,
      HomeRecommendView,
      HomeFeatureView,

    },
    data() {
      return {
        banners: [],
       /* dKeyword: [],
        keywords: [],*/
        recommends: []
      }
    },
    created() {
      getHomeMultidata().then(res => {  //请求数据
        this.banners = res.data.banner.list
        /*this.dKeyword = res.data.dKeyword
        this.keywords = res.data.keywords*/
        this.recommends = res.data.recommend.list
      })
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;  /*position后脱离文档流，留出预留空间*/
  }
  .home-nav {
    background-color: var(--color-tint);
    color: white;

    position: fixed;   /*固定于顶部*/
    left: 0;
    top: 0;
    right: 0;
    z-index: 2;
  }

  .tab-control {   /*吸顶样式设置*/
    position: sticky;
    top: 44px;
  }
</style>
