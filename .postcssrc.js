module.exports = {
    plugins: {
      'autoprefixer': {
        browsers: ['Android >= 4.0', 'iOS >= 7']
      },
      'postcss-pxtorem': {
        rootValue: 37.5, //vant-UI的官方根字体大小是37.5
        propList: ['*']
      }
    }
  }
  
// module.exports = {
//   "plugins": {
//     "postcss-import": {},
//     "postcss-url": {},
//     // to edit target browsers: use "browserslist" field in package.json
//     "autoprefixer": {
//       "browsers": ['last 10 Chrome versions', 'last 5 Firefox versions', 'Safari >= 8']
//      },
//      'postcss-px2rem':{'remUnit':37.5}    //配置rem基准值，75是iphone6标准
//   }
// }