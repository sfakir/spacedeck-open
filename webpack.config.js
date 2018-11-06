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
                    'public/javascripts/jquery-2.1.4.min.js',
                    'public/javascripts/i18next-1.11.2.js',
                    'public/javascripts/clipboard.js',

                    'public/javascripts/lodash.compat.js',
                    'public/javascripts/fastclick.js',
                    'public/javascripts/vue.js',
                    'public/javascripts/moment.js',
                    'public/javascripts/medium.patched.js',
                    'public/javascripts/route-recognizer.js',

                    'public/javascripts/backend.js',
                    'public/javascripts/link_parser.js',
                    'public/javascripts/vector-render.js',
                    'public/javascripts/mousetrap.js',
                    'public/javascripts/smoke.js',
                    'public/javascripts/helper.js',
                    'public/javascripts/packer.growing.js',

                    'public/javascripts/spacedeck_routes.js',
                    'public/javascripts/spacedeck_formatting.js',
                    'public/javascripts/spacedeck_sections.js',
                    'public/javascripts/spacedeck_spaces.js',
                    'public/javascripts/spacedeck_teams.js',
                    'public/javascripts/spacedeck_board_artifacts.js',
                    'public/javascripts/spacedeck_users.js',
                    'public/javascripts/spacedeck_account.js',
                    'public/javascripts/spacedeck_modals.js',
                    'public/javascripts/spacedeck_avatars.js',
                    'public/javascripts/spacedeck_websockets.js',

                    'public/javascripts/spacedeck_whiteboard.js',
                    'public/javascripts/spacedeck_directives.js',
                    'public/javascripts/spacedeck_vue.js',

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