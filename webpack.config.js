module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: {
        main: './src/index.tsx',
        chat_room: './src/frontend/chat_room/index.tsx',
        settings: './src/frontend/settings/index.tsx',
        posts_page: './src/frontend/posts_page/index.tsx'
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