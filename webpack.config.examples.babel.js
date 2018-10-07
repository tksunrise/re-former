import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default () => (
    {
        mode: 'development',
        entry: path.join(__dirname, "src/index"),
        output: {
            path: path.join(__dirname, "dist"),
            filename: "reformer.js",
        },
        module: {
            rules: [
                {
                    test: /\.(js)$/,
                    exclude: /node_modules/,
                    use: 'babel-loader'
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(__dirname, "src/index.tpl.html"),
                inject: true
            })
        ]
    }
);