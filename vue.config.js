module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
    devServer: {
        host:'0.0.0.0',
        port: 8086,
        proxy: {
            '/api':{
                target: 'http://dengji.fangyi.cniotroot.cn',
                // target: 'http://1-101.ci.maintain.cniotroot.cn/',   // ci环境
                changeOrigin: true
            }
        },
    },
    chainWebpack: config => {
        config.entry('main').add('babel-polyfill')
    }
}