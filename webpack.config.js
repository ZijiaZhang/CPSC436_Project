path = require('path');

module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: {
        main: './src/index.tsx',
        status: './src/status.tsx'
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
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public/javascripts'),
    },
};
