const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/main.js',
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules'),
  },
  externals: {
    'custom-electron-prompt': 'custom-electron-prompt',
  },
  plugins:  [
    new CopyPlugin({
      patterns: [
        { from: "resources/prompt.css", to: "prompt.css" },
      ],
    }),
  ]
};
