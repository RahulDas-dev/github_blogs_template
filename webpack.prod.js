const path = require("path");

const content = require("./src/content.json");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizer = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "production",
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.[contenthash].js",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /(?!test\.)\.ts$/,
                use: ["ts-loader"],
                include: [path.resolve(__dirname, "src")],
                exclude: [path.resolve(__dirname, "test"), path.resolve(__dirname, "node_modules")],
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                        },
                    },
                    "postcss-loader",
                ],
            }, 
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader'
            },
            {
            test: /\.(svg|png)$/,
            use: [
                {
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "./",
                    },
                },
                ],
            },
               
        ]
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Rahul Das | ML ,Data Science Engineer",
            template: "./src/template.hbs",
            templateParameters: content,
            inject: "body", 
            minify: false
        }),
        new CopyPlugin({
            patterns: [
              {
                from: path.resolve(__dirname, "src/media/"),
                to: path.resolve(__dirname, "dist/"),
              }
            ],
            options: {
              concurrency: 4,
            },
        }),
        new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
    ],
    optimization:{
        minimizer:[new CssMinimizer()]
    }   
}