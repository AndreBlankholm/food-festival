const path = require("path");  // node.js is used to build webpack.  we are building pathing here.
const webpack = require("webpack");



// First, we need to create the main configuration object within our file.
//For a basic configuration, we need to provide webpack with three properties: entry, output, and mode.
//output that bundled code to a folder that we specify. It is common and best practice to put your bundled code into a folder named dist
//The entry point is the root of the bundle and the beginning of the dependency graph, so give it the relative path to the client's code
module.exports = {
    entry: './assets/js/script.js',
    output: {                                    
        path: path.resolve(__dirname, 'dist'),   
        filename: 'main.bundle.js'
      },
      plugins:[
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery"
        }),
      ],
        mode: "development"
}; 

