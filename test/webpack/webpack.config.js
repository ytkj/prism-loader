const path = require('path');

module.exports = function(env) {
    return {
        entry: path.join(__dirname, 'app.js'),
        output: {
            filename: 'bundle.js',
            path: path.join(__dirname)
        },
        resolve: {
            extensions: ['.js']
        },
        module: {
            rules: [{
                test: /\.html$/,
                use: [{
                    loader: 'html-loader'
                }, {
                    loader: '../../index'
                }]
            }]
        },
        devServer: {
            contentBase: [
                path.join(__dirname, '../../node_modules/prismjs/themes'),
                path.join(__dirname, '../../node_modules/prismjs/plugins/line-numbers'),
                path.join(__dirname, '../../node_modules/prismjs/plugins/line-highlight'),
                __dirname,
            ],
            publicPath: '/',
            port: 3030
        }
    };
};
