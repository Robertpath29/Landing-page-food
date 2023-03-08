const path = require("path");

const mode = process.env.NODE_ENV || "development";
const devMode = mode == "development";
const devtool = devMode ? "source-map" : undefined;

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const postcssPresetEnv = require("postcss-preset-env");
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');



module.exports = {
    mode,
    devtool,

    devServer: {
        open: true,
        hot: false,
    },

    entry: {
        main: path.resolve(__dirname, "src", "main.js"),
        jQuery: path.resolve(__dirname, "./node_modules/jquery/src/jquery.js"),

    },

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: devMode ? "[contenthash].js" : "[contenthash].min.js",
        clean: true,
        assetModuleFilename: "asses/[hash][ext]"
    },
    plugins: [

        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.pug")
        }),

        new MiniCssExtractPlugin({
            filename: devMode ? "style.[contenthash].css" : "style.[contenthash].min.css",
        }),
    
        new FaviconsWebpackPlugin({
            logo: path.resolve(__dirname, './src/img/icons/favicons/BestSeler-img-1.png'),

            outputPath: "favicons/",
            prefix: "favicons/",

            favicons: {
                icons: {
                    android: false,
                    appleIcon: false,
                    appleStartup: false,
                    coast: false,
                    favicons: true,
                    windows: false,
                    yandex: false
                },
            },
        }),
    ],

    module: {
        rules: [
            { test: /\.pug$/i, loader: "pug-loader" },

            {
                test: /\.(c|sa|sc)ss$/i,
                use: [devMode ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader",
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
                test: /\.ttf$/i,
                type: "asset/resource",
                generator: {
                    filename: "fonts/[name][ext]"
                }
            }

        ]
    }


}