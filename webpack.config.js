// A Node function to get and build an absolute path
const path = require('path');

// This is a NodeJs export, as WebPack "speaks" Node
module.exports = {
    entry: './src/app.js',      // This tells webpack what the root-entry file of your project is
    output: {
        filename: 'bundle.js',  // What you want to call the final JS file (the file you'll import in your index.html)
        path: path.resolve(__dirname, './dist')          // This is the target directory path where WP must save the file (must match your tsconfig "outdir")
    }
};