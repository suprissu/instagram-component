const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');

module.exports = withCSS(withSass({
    cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: '[local]___[hash:base64:5]',
    },
    webpack: (config) => {
        config.module.rules.push(
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 100000,
                    },
                },
            },
            {
                enforce: 'pre',
                test: /.scss$/,
                loader: 'sass-resources-loader',
                options: {
                    resources: ['./styles/variables.scss'],
                },
            },
        );

        return config;
    },
}));