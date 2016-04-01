var webpack = require('webpack');
var path = require('path');

module.exports ={
    debug: false,
    entry: './index.js',
    output: {
        path: 'builds',
        filename: 'bundle.js',
        publicPath: 'builds/',
        pathinfo: true,
    },
    resolve: {
        // Absolute path that contains modules
        root: __dirname,
        // Directory names to be searched for modules
        modulesDirectories: ['node_modules'],

    },
    resolveLoader: {
        modulesDirectories:['node_modules']
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                loader: 'babel',
                include: [
                            path.resolve('./index.js'),
                    ],
                query: {
                    presets: ['es2015']
                }
            },
        ]
    },
}
