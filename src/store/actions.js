export default {
  addCart(context,payload) {
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid) /*判断商品是否已经存在*/
    if(oldProduct) {  /*存在*/
      context.commit('addCounter',oldProduct)
    } else {  /*不存在*/
      payload.count = 1
      context.commit('addToCart',payload)
    }
  }
}
