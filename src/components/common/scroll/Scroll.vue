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
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      //1.创建better-scroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        click: true,  /*使得scroll内部元素div/span等可点击*/
        probeType: this.probeType,  /*是否实时监听滚动位置*/
        pullUpLoad: this.pullUpLoad  /*上拉加载*/
      })

      //2.监听滚动位置
      if(this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll',(position) => {
          this.$emit('scroll',position)
        })
      }

      //3.监听上拉加载事件
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }
    },
    methods: {
      scrollTo(x,y,time=600) {
        this.scroll && this.scroll.scrollTo(x,y,time)    /*先判断scroll对象有没有被创建*/
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      refresh() {          /*重新计算 可滚动得区域*/
        this.scroll && this.scroll.refresh()
      }
    }
  }
</script>

<style scoped>

</style>
