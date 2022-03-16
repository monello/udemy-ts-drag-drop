// A Node function to get and build an absolute path
const path = require('path')

// This is a NodeJs export, as WebPack "speaks" Node
module.exports = {
    mode: 'development',
    entry: './src/app.ts',      // This tells webpack what the root-entry file of your project is
    output: {
        filename: 'bundle.js',  // What you want to call the final JS file (the file you'll import in your index.html)
        path: path.resolve(__dirname, 'dist'),          // This is the target directory path where WP must save the file (must match your tsconfig "outdir")
        publicPath: 'dist'
    },
    // This tells WebPack that tsconfgig generates source-maps, which it include, to use to wire-up the mappings to the final bundled files
    devtool: 'inline-source-map',
    // modules tells webpack how to process the TS files (a module is a file, when using ES Modules)
    module: {
        // rules is where you list different kinds of files, we're going to list TS here, but can also add filetypes like CSS and more commonly SASS
        rules: [
            {
                // a test webpack will perform on a file to see if it meets this ruke
                test: /\.ts$/,
                // which Wp-plugin to use. This ons is the package we installed along with WebPack (seen listed in the package.json). ts-loader
                // ts-loader uses the existing tsconfig.json, so no extra configs are needed here
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        // which file types to process and bundle together
        extensions: ['.ts', '.js']
    }
};