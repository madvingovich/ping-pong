
const path = require('path');

module.exports = {
    entry: [
        './js/startGame.js'
    ],
    output: {
        path: path.resolve(__dirname, './dist/js/'),
        filename: 'main.js',
        publicPath: 'dist/'
    },
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.js$/,
            include: path.resolve(__dirname, 'src/js'),
            use: {
                loader: 'babel-loader',
                options: {
                    presets: 'env'
                }
            }
        }]
    },

};