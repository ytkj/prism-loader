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
        devServer: {
            contentBase: [
                path.join(__dirname, '../../node_modules/prismjs/themes'),
                path.join(__dirname, '../../node_modules/prismjs/plugins/line-numbers'),
                path.join(__dirname, '../../node_modules/prismjs/plugins/line-highlight'),
                path.join(__dirname, './node_modules/bootstrap/dist/css'),
                __dirname,
            ],
            publicPath: '/',
            port: 3030
        }
    };
};
