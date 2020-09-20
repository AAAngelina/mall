import {request} from "./request";

export function getDetail(iid) {    /*获取数据*/
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

export class BaseInfo {                    /*将复杂的数据封装到一个类*/
  constructor(itemInfo,colums,services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.realPrice = itemInfo.lowNowPrice
    this.discount = itemInfo.discountDesc
    this.columns = colums
    this.services = services
  }
}
