module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: {
        main: './src/index.tsx'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            }
        ]
    },
    externals: {
        react: "React",
        "react-dom": "ReactDOM"
    }
};