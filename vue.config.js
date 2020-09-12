module.exports = {
  configureWebpack: {
    resolve: {   /*解决路径相关问题*/
      extensions: [],   //扩展名
      alias: {   //起别名
       /* '@': 'src'*/
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
       }
    }
  }
}