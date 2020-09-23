export default {
  addToCart(state,payload) {
    state.cartList.push(payload)
  },
  addCounter(state,payload) {
    payload.count ++
  }
}
