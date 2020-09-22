import {request} from "./request";

export function getDetail(iid) {    /*获取数据*/
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

export function getRecommend() {
  return request({
    url: '/recommend'
  })
}
export class BaseInfo {                    /*将复杂的数据封装到一个类,商品基本信息类*/
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

export class Shop {   /*店铺*/
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.cFans
    this.sells = shopInfo.cSells
    this.score = shopInfo.score
    this.goodsCount = shopInfo.cGoods
  }
}

export class GoodsParam {   /*商品参数*/
  constructor(info,rule) {
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}
