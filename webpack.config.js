const path = require("path");

module.exports = {
    entry: "./scripts/main.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
        chunkFilename: "./chunks/[name].js",
        publicPath: "dist"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{ loader: "babel-loader" }]
            },
            {
                test: /\.css$/,
                use: [{ loader: "style-loader" }, { loader: "css-loader" }]
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8192,
                            name: "./images/[name].[ext]"
                        }
                    }
                ]
            }
        ]
    }
};
