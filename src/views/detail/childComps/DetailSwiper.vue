<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="(item,index) in topImages" :key="index" >
      <img :src="item" alt="" @load="imgLoad">
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper'
  export default {
    name: "DetailSwiper",
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        isLoad: false
      }
    },
    methods: {
      imgLoad() {
        if(!this.isLoad) {
          this.$emit('imgLoad')
          this.isLoad = true
        }
      }
    }
  }
</script>

<style scoped>
  .detail-swiper {
    height:270px;
    overflow: hidden;
  }
</style>
