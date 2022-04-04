const path = require("path");

const content = require("./src/content.json");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/index.ts",
    devtool: "inline-source-map",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
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
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: path.resolve(__dirname, "dist"),
                },
              },
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
            test: /\.(svg|png|jpg|jpeg)$/,
            type: "asset/resource",
            use: [
              {
                loader: "file-loader",
                options: {
                  name: "[name].[ext]",
                  outputPath: ".",
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
          title: "Development",
          templateParameters: content,
          template: "./src/template.hbs", 
          inject: "body", 
          minify: false 
        }),
        new CopyPlugin({
          patterns: [
            {
              from: path.resolve(__dirname, "src/media/"),
              to: path.resolve(__dirname, "dist/"),
            },
          ],
          options: {
            concurrency: 4,
          },
        }),    
        new MiniCssExtractPlugin({ filename: "[name].css" }),
    ],
    devServer: {
        port: 8081,
        host: 'local-ipv4',
        hot: true,
    },      
}  