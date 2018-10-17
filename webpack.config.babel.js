import path from 'path';

export default () => (
    {
        mode: 'production',
        entry: {
            Form: path.join(__dirname, "src/Form"),
            ContextForm: path.join(__dirname, "src/ContextForm"),
            Field: path.join(__dirname, "src/Field"),
            ErrorList: path.join(__dirname, "src/ErrorList"),
            ErrorMessage: path.join(__dirname, "src/ErrorMessage"),
            Submit: path.join(__dirname, "src/Submit"),
            improve: path.join(__dirname, "src/improve"),
        },
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