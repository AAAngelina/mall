<template>
  <div id="detail">
    <detail-nav-bar/>
    <detail-swiper :top-images="topImages"/>
    <detail-base-info :base-info="baseInfo"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";

  import {getDetail,BaseInfo} from "network/detail";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo
    },
    data() {
      return {
        id: null,
        topImages: [],
        baseInfo: {}
      }
    },
    created() {
      this.id = this.$route.params.id
      //2.根据id请求详情数据
      getDetail(this.id).then(res => {
        const data = res.result
        this.topImages = data.itemInfo.topImages  //轮播数据
        /*获取商品信息*/
        this.baseInfo = new BaseInfo(data.itemInfo,data.columns,data.shopInfo.services)
      })
    }
  }
</script>

<style scoped>

</style>
