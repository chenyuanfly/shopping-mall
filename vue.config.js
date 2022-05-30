const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  lintOnSave: false, //是否开启eslint
  devServer:{
    open:true,
    // host:'localhost',
    // port:8081,
    // https:false,
    // hotOnly:false,
    proxy:{
      '/api':{
        changeOrgin:true,
        target:'http://202.193.53.235:8080',
        pathRewrite:{
          '^/api': ''
        }
      }
    }
  }
}


