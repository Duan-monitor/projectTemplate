const path = require('path');

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    outputDir: 'dist/www/',
    assetsDir: 'static',
    configureWebpack: {
        resolve: {
            alias: {
                '@v': path.join(__dirname, 'src/views'),
                '@assets': path.join(__dirname, 'src/assets'),
                '@api': path.join(__dirname, 'src/api'),
                '@c': path.join(__dirname, 'src/components'),
                '@u': path.join(__dirname, 'src/utils'),
                '@j': path.join(__dirname, 'src/json')
            }
        }
    },
    chainWebpack: config => {
        config.module
            .rule('less')
            .oneOf('vue')
            .use('less-loader')
            .tap(options => {
                options.modifyVars = {
                    blue: '#e3393c'
                }
                return options
            })
        config.module
            .rule('less')
            .oneOf('vue')
            .use('px2rem-loader')
            .loader('px2rem-loader')
            .before('postcss-loader')
            .tap(options => {
                options = {
                    remUnit: 37.5,
                    remPrecision: 8,
                    baseDpr: 1
                }
                return options
            })
        config.module
            .rule('images')
            .use('url-loader')
            .tap(options => {
                options.limit = 40960
                return options
            })
    }
}
