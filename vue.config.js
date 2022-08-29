module.exports = {
  //停止打包map文件
  productionSourceMap: false,
  //关闭eslint
  lintOnSave: false,
  //配置代理
  devServer: { 
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn'
      }
    }
  }
}