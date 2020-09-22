<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="detail-content" ref="scroll">
      <detail-swiper :top-images="topImages" @imgLoad="imgLoad"/>  <!--监听图片加载完成，刷新scrollHeight-->
      <detail-base-info :base-info="baseInfo"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imagesLoad="imgLoad"/>
      <detail-param-info :param-info="paramInfo"/>
      <detail-comment-info :comment-info="commentInfo"/>
      <goods-list :goods="recommends"/>
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
    data() {
      return {
        id: null,
        topImages: [],
        baseInfo: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: []
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
    },
    methods: {
      imgLoad() {
        this.$refs.scroll.refresh()
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
