<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">   <!--使用封装的better-scroll-->
      <home-swiper :banners="banners"/>   <!--父传子-->
      <home-recommend-view :recommends="recommends"/>
      <home-feature-view/>
      <tab-control :titles="['流行','新款','精选']" class="tab-control"
                   @tabClick="tabClick"/>  <!--监听子组件触发的事件-->
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>  <!--监听组件根元素的原生事件，添加.native修饰符-->
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
  import Scroll from "../../components/common/scroll/Scroll";
  import BackTop from "../../components/content/backTop/BackTop";


  /*导入函数*/
  import {getHomeMultidata,getHomeGoods} from "../../network/home";


  export default {
    name: "Home",
    components: {
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,
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
        },
        currentType: 'pop',
        isShowBackTop: false
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      this.getHomeMultidata()
      //请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

      //事件总线，监听item中图片加载完成
      this.$bus.$on('itemImageLoad', () => {
        this.$refs.scroll.refresh()
      })
    },
    methods: {
      /**
       * 事件监听
       */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
        }
      },
      backClick() {
        /*this.$refs.scroll.scroll.scrollTo(0,0,600)   /!*拿到scroll组件里的scroll；将位置设置到0，0;时间为600*!/*/
        this.$refs.scroll.scrollTo(0,0,600)  /*直接调scroll组件的scrollTo方法*/
      },
      contentScroll(position) {
        /*if(-position.y > 1000) {
          this.isShowBackTop = true
        } else {
          this.isShowBackTop = false
        }*/
        this.isShowBackTop = (-position.y) > 1000
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
        this.$refs.scroll.refresh()
      },
      /**
       * 网络请求
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1  //获取页码
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)   //解构压入
          this.goods[type].page ++

          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;  /*position后脱离文档流，留出预留空间*/
    height: 100vh;   /*viewport height,视口*/
    position: relative;
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

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
