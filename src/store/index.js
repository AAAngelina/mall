import Vue from 'vue'
import Vuex from 'vuex'

//1.安装插件
Vue.use(Vuex)

//2.创建并导出store对象
export default new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addToCart(state,payload) {
      state.cartList.push(payload)
    },
    addCounter(state,payload) {
      payload.count ++
    }
  },
  actions: {
    addCart(context,payload) {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid) /*判断商品是否已经存在*/
      if(oldProduct) {  /*存在*/
        context.commit('addCounter',oldProduct)
      } else {  /*不存在*/
        payload.count = 1
        context.commit('addToCart',payload)
      }
    }
  },
  modules: {
  }
})
