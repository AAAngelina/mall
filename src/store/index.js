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
    addCart(state,payload) {
      /*let oldProduct = null
      for(let item of state.cartList) {
        if(item.iid === payload.iid) {
          oldProduct = item
        }
      }*/
      let oldProduct = state.cartList.find(item => item.iid === payload.iid)
      if(oldProduct) {
        oldProduct.count += 1  /*存在*/
      } else {  /*不存在*/
        state.cartList.push(payload)
        payload.count = 1
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
