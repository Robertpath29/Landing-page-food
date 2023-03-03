const path = require("path");

const mode = process.env.NODE_ENV || "development";
const devMode = mode == "development";
const devtool = devMode ? "source-map" : undefined;

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const postcssPresetEnv = require("postcss-preset-env");
const SpritesmithPlugin = require('webpack-spritesmith');

module.exports = {
    mode,
    devtool,

    entry: {
        main: path.resolve(__dirname, "src", "main.js"),
        jQuery: path.resolve(__dirname, "./node_modules/jquery/src/jquery.js"),
    },

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: devMode ? "[contenthash].js" : "[contenthash].min.js",
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.pug")
        }),

        new MiniCssExtractPlugin({
            filename: devMode ? "style.[contenthash].css" : "style.[contenthash].min.css",
        }),

        new SpritesmithPlugin({
            src: {
                cwd: path.resolve(__dirname, './src/img/icons/'),
                glob: '*.png'
            },
            target: {
                image: path.resolve(__dirname, 'src/img/icons/sprite/sprite.png'),
                css: path.resolve(__dirname, 'src/style/global/sprite.scss')
            },
            apiOptions: {
                cssImageRef: "./img/icons/sprite/sprite.png"
            }
        }),
    ],

    module: {
        rules: [
            { test: /\.pug$/i, loader: "pug-loader" },

            {
                test: /\.(c|sa|sc)ss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader",
                {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            plugins: [postcssPresetEnv]
                        }
                    }
                },
                    "sass-loader"]
            },

            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            },
            {
                test: /\.(jpe?g|png|webp|gif|svg)$/i,
                use: [
                    {
                        loader: "image-webpack-loader",
                        options: {
                            mozjpeg: {
                                progressive: true,
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ],

                type: "asset/resource",
                generator: {
                    filename: "img/[name][ext]"
                }
            },

            {
                test: /\.woff2?$/i,
                type: "asset/resource",
                generator: {
                    filename: "fonts/[name][ext]"
                }
            }

        ]
    }


}