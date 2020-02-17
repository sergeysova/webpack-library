const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const Package = require('./package.json');

module.exports = {
  mode: 'production',
  entry: `./src/index.ts`,
  output: {
    filename: `index.js`,
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  node: {
    module: 'empty',
    dgram: 'empty',
    dns: 'mock',
    fs: 'empty',
    http2: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  externals: [
    ...Object.keys(Package.dependencies || {}),
    ...Object.keys(Package.peerDependencies || {}),
    ...Object.keys(Package.optionalDependencies || {}),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};
