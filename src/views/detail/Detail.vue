<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick"/>
    <scroll class="detail-content" ref="scroll">
      <detail-swiper :top-images="topImages" @imgLoad="imgLoad"/>  <!--监听图片加载完成，刷新scrollHeight-->
      <detail-base-info :base-info="baseInfo"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imagesLoad="imgLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
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

  import Scroll from "components/common/scroll/Scroll";

  import GoodsList from "components/content/goods/GoodsList";

  import {getDetail,BaseInfo,Shop,GoodsParam,getRecommend} from "network/detail";
  import {itemListenerMixin} from "../../common/mixin";
  import {debounce} from "../../common/utils";

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

      GoodsList,
      Scroll
    },
    mixins: [itemListenerMixin],
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
        getThemeTopY: null
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
        this.themeTopYs.push(this.$refs.params.$el.offsetTop-44)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44)
        console.log(this.themeTopYs);
      },200)
    },
    mounted() {
    },
    destroyed() {
      this.$bus.$off('itemImageLoad',this.itemImgListener)
    },
    methods: {
      titleClick(index) {
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],300)
      },
      imgLoad() {
        this.$refs.scroll.refresh()
        this.getThemeTopY()
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
    height: calc(100% - 44px);  /*100%相对于父元素*/
  }
</style>
