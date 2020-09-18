<template>
  <div id="detail">
    <detail-nav-bar/>
    <detail-swiper :top-images="topImages"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";

  import {getDetail} from "network/detail";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper
    },
    data() {
      return {
        id: null,
        topImages: [],
      }
    },
    created() {
      this.id = this.$route.params.id
      //2.请求详情数据
      getDetail(this.id).then(res => {
        this.topImages = res.result.itemInfo.topImages  //轮播数据
        console.log(this.topImages);
      })
    }
  }
</script>

<style scoped>

</style>
