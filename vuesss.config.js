const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const BonePreRender = require('@fe/bone-prerender');
const {
    messages,
    proxy
} = require('./tools/dev');
const routes = require('./config/prerender.json');
const error404 = require('./config/404.json');

/**
 * 打包产出目录
 *
 * @type {string}
 */
const outputDir = process.env.OUTPUT_DIR;

const {
    CopyFallback,
    PreRender,
    Copy404
} = new BonePreRender({
    routes,
    404: error404,
    server: {
        proxy,
    },
});

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    outputDir,
    assetsDir: 'static',
    devServer: {
        disableHostCheck: true,
        proxy,
    },
    productionSourceMap: false,
    pluginOptions: {
        lintStyleOnBuild: true,
        stylelint: {
            fix: true,
        },
    },

    css: {
        loaderOptions: {
            // 引入通用变量
            scss: {
                prependData: [
                    '@import "~@/assets/styles/variables.scss";',
                    '@import "~@/assets/styles/mixins.scss";',
                ].join(''),
            },
        },
    },

    transpileDependencies: [
        '@fe/utils',
    ],

    chainWebpack: (config) => {
        config.plugins.delete('preload');
        config.plugins.delete('prefetch');
        config.plugin('define').tap((definitions) => {
            definitions[0]['process.env'].SITE_ENV = JSON.stringify(process.env.SITE_ENV);
            return definitions;
        });
    },

    // 会被 webpack-merge 合并入最终的 webpack 配置
    configureWebpack: {
        performance: {
            hints: 'warning',
            maxEntrypointSize: !isProduction ? 1024 * 1024 * 1024 : 1024 * 1024,
            maxAssetSize: !isProduction ? 1024 * 1024 * 1024 : 1024 * 1024,
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    // @fe 变动频繁，单独打一个包
                    '@fe': {
                        name: '@fe',
                        test: /[\\/]node_modules[\\/]@fe/,
                        priority: 10,
                        reuseExistingChunk: true,
                        enforce: true,
                        chunks: 'all',
                    },
                },
            },
        },

        plugins: [
            new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages,
                },
            }),

            new CopyFallback(),
            new PreRender(),
            new Copy404(),
        ],
    },
};
