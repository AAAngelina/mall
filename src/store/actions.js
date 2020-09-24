import {ADD_COUNTER,ADD_TO_CART} from "./mutation-types";

export default {
  addCart(context,payload) {
    /*返回一个Promise*/
    return new Promise((resolve) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid) /*判断商品是否已经存在*/
      if(oldProduct) {  /*存在*/
        context.commit(ADD_COUNTER,oldProduct)
        resolve('当前商品数量+1')
      } else {  /*不存在*/
        payload.count = 1
        context.commit(ADD_TO_CART,payload)
        resolve('添加新的商品')
      }
    })
  }
}
