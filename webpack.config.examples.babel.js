import path from 'path';

export default () => (
    {
        mode: 'development',
        entry: path.join(__dirname, "src/index"),
        output: {
            path: path.join(__dirname, "dist"),
            filename: "reformer.[name].js",
            library: ["reformer", "[name]"],
            libraryTarget: 'umd',
            globalObject: 'this',
        },
        externals: {
            'react': {
                commonjs: 'react',
                commonjs2: 'react',
                amd: 'react',
                root: 'react'
            }
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
    }
);