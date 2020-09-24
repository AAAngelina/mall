<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isSelectedAll"
                    @click.native="checkAllClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计:{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去计算({{checkedLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";

  import { mapGetters } from 'vuex'

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return '￥' + this.cartList.filter(item => {
          return item.checked    /*过滤选中的商品*/
        }).reduce((preValue,item) => {   /*汇总*/
          return preValue + item.price * item.count
        },0).toFixed(2)  /*保留两位小数*/
      },
      checkedLength() {
        return this.cartList.filter(item => item.checked).length
      },
      isSelectedAll() {
        /*1.return !(this.cartList.filter(item => !item.checked).length)   /!*存在没有选中的商品时，返回false*!/*/
        if(this.cartList.length === 0)
          return false
        return !this.cartList.find(item => !item.checked)  /*不完全遍历，性能更高*/
      },
      unSelected() {
        return this.cartList.filter(item => item.checked).length === 0
      }

    },
    methods: {
      checkAllClick() {
        if(this.isSelectedAll) {   //1.原来全部选中，点击都不选
          this.cartList.forEach(item => item.checked = false)
        } else {   //2.原来未全部选中，点击全部选中
          this.cartList.forEach(item => item.checked = true)
        }
      },
      calcClick() {
        if(this.unSelected) {
          this.$toast.show('请选择购买的商品！',2000)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    line-height: 40px;
    background-color: #eeeeee;
    position: relative;
    display: flex;
    font-size: 14px;
  }
  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 70px;
  }
  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .price {
    margin-left: 20px;
    flex: 1;
  }
  .calculate {
    width: 80px;
    text-align: center;
    background-color: #ff51ea;
    color: #f2f5f8;
  }
</style>
