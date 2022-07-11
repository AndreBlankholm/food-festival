
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;  //#3
const path = require("path");  // node.js is used to build webpack.  we are building pathing here. #1
const webpack = require("webpack");  //#2



// First, we need to create the main configuration object within our file.
//For a basic configuration, we need to provide webpack with three properties: entry, output, and mode.

//The entry point is the root of the bundle and the beginning of the dependency graph, so give it the relative path to the client's code
module.exports = {
    entry: {
      app: './assets/js/script.js',  // instead of script.js link
      events: './assets/js/events.js', 
      schedule: './assets/js/schedule.js',
      tickets: './assets/js/tickets.js'
    },
    output: {                                    
           //output that bundled code to a folder that we specify. It is common and best practice to put your bundled code into a folder named dist
        filename: "[name].bundle.js",
        path: __dirname + "/dist" // Our build step will create a series of bundled files, one for each listing in the entry object. Change the filename attribute in the output object to filename: "[name].bundle.js"
      },
      module: {  // adding file loader to webpack ("file-loader": "^6.2.0")
        rules: [  // This object will identify the type of files to pre-process using the test property to find a regular expression, or regex. 
          {
            test: /\.jpg$/i,  // we are trying to process any image file with the file extension of .jpg. We could expand this expression to also search for other image file extensions such as .png, .svg, or .gif.
            use: [
              {
                loader: 'file-loader',
                options: {
                  esModule: false,  // incase file is treated like a ES5 module and gets formatted incorrectly
                  name (file) {
                    return "[path][name].[ext]"  // this returns the name of the file with the file extension instead of ES% making some random id for the images
                  },
                  publicPath: function(url) {
                    return url.replace("../", "/assets/") //a function that changes our assignment URL by replacing the ../ from our require() statement with /assets/.
                  }
                }  
              },
              {
                loader: 'image-webpack-loader'  // this image-webpack-loader needs to be under the file loader so it proccess correctly on cascade
              }
            ]
          }
        ]
      },
      plugins:[
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery"
        }),
        new BundleAnalyzerPlugin({
          analyzerMode: "static", // the report outputs to an HTML file in the dist folder
        })
      ],
        mode: "development"
}; 

