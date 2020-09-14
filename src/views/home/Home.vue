<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"/>   <!--父传子-->
    <home-recommend-view :recommends="recommends"/>
    <home-feature-view/>
    <tab-control :titles="['流行','新款','精选']" class="tab-control"/>
    <goods-list :goods="goods['pop'].list"/>
  </div>
</template>

<script>
  /*子组件*/
  import HomeSwiper from "./childComps/HomeSwiper";
  import HomeRecommendView from "./childComps/HomeRecommendView";
  import HomeFeatureView from "./childComps/HomeFeatureView";

  /*公共组件*/
  import NavBar from "../../components/common/navbar/NavBar";
  import TabControl from "../../components/content/tabControl/TabControl";
  import GoodsList from "../../components/content/goods/GoodsList";


  /*导入函数*/
  import {getHomeMultidata,getHomeGoods} from "../../network/home";


  export default {
    name: "Home",
    components: {
      NavBar,
      TabControl,
      GoodsList,
      HomeSwiper,
      HomeRecommendView,
      HomeFeatureView,
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},  /*流行数据*/
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        }
      }
    },
    created() {
      this.getHomeMultidata()

      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    methods: {
      /*请求数据*/
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      /*请求商品数据*/
      getHomeGoods(type) {
        const page = this.goods[type].page + 1  //获取页码
        this.goods[type].page ++
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)   //解构压入
        })
      }
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
    z-index: 3;
  }
</style>
