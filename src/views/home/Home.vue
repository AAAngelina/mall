<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <tab-control :titles="['流行','新款','精选']"
                 ref="tabControl1"
                 @tabClick="tabClick"
                 class="tab-control"
                 v-show="isTabFixed"/>          <!--占位技巧，要不要显示-->

    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">   <!--使用封装的better-scroll-->
      <home-swiper :banners="banners"
                   @swiperImageLoad="swiperImageLoad"/>   <!--父传子-->
      <home-recommend-view :recommends="recommends"/>
      <home-feature-view/>
      <tab-control :titles="['流行','新款','精选']"
                   ref="tabControl2"
                   @tabClick="tabClick"/>
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



  /*导入函数*/
  import {getHomeMultidata,getHomeGoods} from "../../network/home";
  import {itemListenerMixin,backTopMixin} from "../../common/mixin";


  export default {
    name: "Home",
    components: {
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      HomeSwiper,
      HomeRecommendView,
      HomeFeatureView,
    },
    mixins: [itemListenerMixin,backTopMixin],
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
        tabOffsetTop: 0,
        isTabFixed: false,  /*是否吸顶*/
        saveY: 0
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
    },
    mounted() {
    },
    activated() {      /*进入该页面时调用*/
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated() {    /*离开时调用*/
      //1.保存Y值
      this.saveY = this.$refs.scroll.getScrollY()
      //2.取消全局事件的监听
      this.$bus.$off('itemImageLoad',this.itemImgListener)
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
        this.$refs.tabControl1.currentIndex = index      /*保持两个tabControl的点击事件一致*/
        this.$refs.tabControl2.currentIndex = index
      },
      contentScroll(position) {
        //1.判断backTop是否显示
        this.isShowBackTop = (-position.y) > 1000
        //2.决定tabBar是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
        this.$refs.scroll.refresh()
      },
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
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

          this.$refs.scroll.finishPullUp()  //完成上拉加载更多
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;  !*position后脱离文档流，留出预留空间*!*/
    height: 100vh;   /*viewport height,视口*/
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: white;
    /*position: fixed;   !*固定于顶部*，在使用浏览器原生滚动时，固定于顶部!
    left: 0;
    top: 0;
    right: 0;
    z-index: 2;*/
  }
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  /*tabControl2虽然设置fixed，但也会随着better-scroll一起滚出屏幕；因此在最上面多复制了一个tabcontrol1*/
  .tab-control {
    position: relative;
    z-index: 5;
  }
</style>
