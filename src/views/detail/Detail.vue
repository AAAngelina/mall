<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="detail-content" ref="scroll"
            :probeType="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages" @imgLoad="imgLoad"/>  <!--监听图片加载完成，刷新scrollHeight-->
      <detail-base-info :base-info="baseInfo"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imagesLoad="imgLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "components/common/scroll/Scroll";

  import GoodsList from "components/content/goods/GoodsList";

  import {getDetail,BaseInfo,Shop,GoodsParam,getRecommend} from "network/detail";
  import {itemListenerMixin,backTopMixin} from "../../common/mixin";
  import {debounce} from "../../common/utils";
  import { mapActions } from 'vuex'

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,

      GoodsList,
      Scroll
    },
    mixins: [itemListenerMixin,backTopMixin],
    data() {
      return {
        id: null,
        topImages: [],
        baseInfo: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0
      }
    },
    created() {
      this.id = this.$route.params.id
      //2.根据id请求详情数据
      getDetail(this.id).then(res => {
        const data = res.result
        /*1.轮播数据*/
        this.topImages = data.itemInfo.topImages
        /*2.获取商品信息*/
        this.baseInfo = new BaseInfo(data.itemInfo,data.columns,data.shopInfo.services)
        /*3.获取店铺信息*/
        this.shop = new Shop(data.shopInfo)
        /*4.商品详情数据*/
        this.detailInfo = data.detailInfo
        /*5.获取参数信息*/
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        /*6.获取评论信息*/
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })
      //3.请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })
      //4. 对给this.themeTopYs赋值的操作进行防抖
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop-49)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop-49)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-49)
        /*console.log(this.themeTopYs);*/
        this.themeTopYs.push(Number.MAX_VALUE)   /*hack做法，添加一个最大值*/
      },200)
    },
    mounted() {
    },
    destroyed() {
      this.$bus.$off('itemImageLoad',this.itemImgListener)
    },
    methods: {
      ...mapActions(['addCart']),

      titleClick(index) {  /*点击标题，滚到对应的位置*/
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],300)
      },
      imgLoad() {
        this.$refs.scroll.refresh()
        this.getThemeTopY()
      },
      contentScroll(position) {
        const positionY = -position.y
        const length = this.themeTopYs.length
        /*1.for(let i = 0; i < length; i++) {  /!*let i in this.themeTopYs遍历到的i为string类型*!/
          /!*不一致时，在重新判断范围，重新赋值*!/
          if(this.currentIndex !== i && ((i < length-1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])
                                        || (i === length-1 && positionY >= this.themeTopYs[i]))) {
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }*/
        /*2.hack做法*/
        for(let i = 0; i < length-1; i++) {
          if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
        /*返回顶部图标*/
        this.isShowBackTop = (-position.y) > 1000
      },
      addToCart() {
        //1.获取购物车中需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.baseInfo.title
        product.desc = this.baseInfo.desc
        product.price = this.baseInfo.realPrice
        product.iid = this.id
        /*//2.添商品加入购物车，Vuex实现,action
        this.$store.dispatch('addCart',product).then(res => {
          console.log(res);
        })*/
        this.addCart(product).then(res => {
          console.log(res);
        })
      }
    }
  }
</script>

<style scoped>
  #detail {   /*显示在上层，不被覆盖*/
    position: relative;
    z-index: 9;
    background-color: #ffffff;
    height: 100vh;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #ffffff;
  }
  .detail-content {  /*设置固定高度*/
    height: calc(100% - 44px - 58px);  /*100%相对于父元素*/
    overflow: hidden;
  }
</style>
