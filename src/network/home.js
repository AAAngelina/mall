/*对首页的请求，做统一管理*/

import {request} from './request'

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}
