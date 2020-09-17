export function debounce(func,delay) {  /*refresh防抖函数,返回新的函数*/
  let timer = null
  return function (...args) {
    if(timer)  clearInterval(timer)
    timer = setTimeout(() => {
      func.apply(this,args)
    },delay)
  }
}
