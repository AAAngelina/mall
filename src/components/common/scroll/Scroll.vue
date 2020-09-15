<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    data() {
      return {
        scroll: null
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 0   //0或1时，不监听
      }
    },
    mounted() {
      //1.创建better-scroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        click: true,  /*使得scroll内部元素div/span等可点击*/
        probeType: this.probeType
      })
      //2.监听滚动位置
      this.scroll.on('scroll',(position) => {
        this.$emit('scroll',position)
      })
    },
    methods: {
      scrollTo(x,y,time=600) {
        this.scroll.scrollTo(x,y,time)
      }
    }
  }
</script>

<style scoped>

</style>
