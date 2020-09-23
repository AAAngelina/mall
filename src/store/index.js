import Vue from 'vue'
import Vuex from 'vuex'


//1.安装插件
Vue.use(Vuex)

import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

//2.创建并导出store对象
const state = {
  cartList: []
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
  }
})
