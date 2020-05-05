const VueLoaderPlugin = require("vue-loader/lib/plugin")

module.exports = {
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(jpg|png)$/,
                loader: "file-loader",
                options: {
                    outputPath: 'images'
                }
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
            },
            {
                test: /\.css$/,
                use: [
                    "vue-style-loader",
                    "css-loader",
                ],
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    resolve: {
        extensions: [".vue", ".js"],
        alias: {
            "vue$": "vue/dist/vue.esm.js"
        }
    },
}