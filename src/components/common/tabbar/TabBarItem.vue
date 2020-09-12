<template>
  <div class="tab-bar-item" @click="itemClick">
    <slot v-if="!isActive" name="item-icon"></slot>  <!--具名插槽-->
    <slot v-else name="item-icon-active"></slot>
    <div :style="activeStyle"><slot name="item-text"></slot></div> <!--动态绑定样式-->
      <!--slot外包裹一层元素，设置样式时，避免被替代-->
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      path: String,
      activeColor: {
        type: String,
        default: '#25a735'
      }
    },
    data () {
      return {
        /*isActive: false*/

      }
    },
    computed: {
      isActive () {
        return this.$route.path.indexOf(this.path) !== -1 /*当前路由与活跃是否相等*/
      },
      activeStyle () {
        return this.isActive ? {color: this.activeColor} :{}
      }
    },
    methods: {
      itemClick(){
        this.$router.replace(this.path);
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;  /*均分*/
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    margin-bottom: 2px;
    vertical-align: middle;
  }
</style>