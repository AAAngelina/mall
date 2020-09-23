/*监听GoodsListItem的图片是否加载完成*/
import {debounce} from "./utils";
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh,500)
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoad',this.itemImgListener)   /*监听GoodsListItem的事件*/
  }
}

/*返回顶部图标*/
import BackTop from "components/content/backTop/BackTop";
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick() {
      /*this.$refs.scroll.scroll.scrollTo(0,0,600)   /!*拿到scroll组件里的scroll；将位置设置到0，0;时间为600*!/*/
      this.$refs.scroll.scrollTo(0,0,600)  /*直接调scroll组件的scrollTo方法*/
    },
  }
}
