const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}

// 项目部署目录，相对于根目录
const BASE_URL = process.env.NODE_ENV === 'production'
  ? ''
  : 'http://42.51.42.195/admin/'

// 项目部署目录，相对于根目录
const WWW_ROOT = process.env.NODE_ENV === 'production'
  ? '/h5_shopping_demo/'
  : '/'

module.exports = {
  // outputDir: 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）
  outputDir: "dist",
  //用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
  assetsDir: "assets",
  publicPath: WWW_ROOT,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.use('svg-sprite-loader').loader('svg-sprite-loader').options({ symbolId: 'icon-[name]' });
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: false,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  // 打包时不生成.map文件
  productionSourceMap: false,
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      '/': {
        target: BASE_URL, // 设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true,
        pathRewrite: {
          '^/': ''
        }
      }
    }
  }
}
