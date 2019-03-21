const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

let mainConfig = {
    mode: "development",
    entry: "./src/main/main.ts",
    target: "electron-main",
    output: {
        filename: "main.bundle.js",
        path: __dirname + "/../dist"
    },
    node: {
        __dirname: false,
        __filename: false
    },
    resolve: {
        extensions: [".js", ".json", ".ts"]
    },
    module: {
        rules: [
            {
                // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
                test: /\.(ts)$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader"
                }
            },
            {
                test: /\.(jpg|png|svg|ico|icns)$/,
                loader: "file-loader",
                options: {
                    name: "[path][name].[ext]"
                }
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: "file-loader",
                options: {
                    name: "[path][name].[ext]"
                }
            }
        ]
    }
};

let rendererConfig = {
    mode: "development",
    entry: "./src/renderer/renderer.tsx",
    target: "electron-renderer",
    output: {
        filename: "renderer.bundle.js",
        path: __dirname + "/../dist"
    },
    node: {
        __dirname: false,
        __filename: false
    },
    resolve: {
        extensions: [".js", ".json", ".ts", ".tsx"],
        alias: {
            essentials: __dirname + "/../src/renderer/essentials",
            shell: __dirname + "/../src/renderer/shell"
        }
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: "ts-loader"
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            sourceMap: true,
                            localIdentName: "[local]__[hash:base64:5]",
                            minimize: true
                        }
                    },
                    "sass-loader?sourceMap"
                ]
            },
            {
                test: /\.(jpg|png|svg|ico|icns)$/,
                loader: "file-loader",
                options: {
                    name: "[path][name].[ext]"
                }
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: "file-loader",
                options: {
                    name: "[path][name].[ext]"
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../src/renderer/index.html")
        })
    ]
};

module.exports = [mainConfig, rendererConfig];
