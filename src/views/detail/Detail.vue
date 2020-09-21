<template>
  <div id="detail">
    <detail-nav-bar/>
    <detail-swiper :top-images="topImages"/>
    <detail-base-info :base-info="baseInfo"/>
    <detail-shop-info :shop="shop"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";

  import {getDetail,BaseInfo,Shop} from "network/detail";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo
    },
    data() {
      return {
        id: null,
        topImages: [],
        baseInfo: {},
        shop: {}
      }
    },
    created() {
      this.id = this.$route.params.id
      //2.根据id请求详情数据
      getDetail(this.id).then(res => {
        const data = res.result
        /*轮播数据*/
        this.topImages = data.itemInfo.topImages
        /*获取商品信息*/
        this.baseInfo = new BaseInfo(data.itemInfo,data.columns,data.shopInfo.services)
        /*获取店铺信息*/
        this.shop = new Shop(data.shopInfo)
      })
    }
  }
</script>

<style scoped>
  #detail {   /*显示在上层，不被覆盖*/
    position: relative;
    z-index: 5;
    background-color: #ffffff;
  }
</style>
