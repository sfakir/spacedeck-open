const MergeIntoSingleFilePlugin = require('webpack-merge-and-include-globally');
const CopyWebpackPlugin = require('copy-webpack-plugin')


module.exports = {
    entry: {
        main: './public/javascripts/spacedeck_whiteboard.js'
    },
    plugins: [
        new MergeIntoSingleFilePlugin({
            files: {
                "javascripts/spacedeck.js": [
                    'public/javascripts/*.js',

                ],
                "stylesheets/style.css": [
                    'public/stylesheets/*.css'
                ]
            }
        }),
        new CopyWebpackPlugin([
            {
                from: 'public/{images,fonts}/**/*', to: 'build/',
                transformPath(targetPath, absolutePath) {
                    console.log('ta', targetPath);
                    return targetPath.replace(/build\/public\//, '');
                }
            },

            // { from: '**/*', to: '/absolute/path/to/dest/' }
        ], {})

    ],
    output: {
        filename: '[name].js',
        path: __dirname + '/build'
    }

};