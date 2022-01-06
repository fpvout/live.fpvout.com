const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');

module.exports = {
  target: 'web',
  output: {
    publicPath: '/',
    path: path.join(__dirname, 'dist'),
  },
  entry: {
    ui: './src/entrypoints/ui.ts',
    serviceWorker: './src/entrypoints/serviceWorker.ts',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9001,
    https: true,
    // We need this rewrite rule to test 404 page in development, copy 404.html file
    // to the dist folder manually, it's git-ignored anyways, once we're confident
    // this is working, we can change the directive historyApiFallback to true.
    historyApiFallback: {
      rewrites: [
        { from: /^\/.+/, to: '/404.html' },
      ],
    },
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src/'),
    },
    extensions: ['.wasm', '.mjs', '.js', '.ts',],
    mainFiles: ['index'],
    fallback: {
      stream: require.resolve("stream-browserify"),
      buffer: require.resolve("buffer")
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: false,
        },
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: { transpileOnly: true },
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader',
          {
            loader:'sass-loader',
            options: {
              additionalData: `
              @import "~/ui/styles/_functions.scss";
              @import "~/ui/styles/_variables.scss";
              `,
            }
          }
        ],
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg|png|jpeg|jpg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/ui/index.html',
      alwaysWriteToDisk: true,
    }),
    new VueLoaderPlugin(),
  ],
};
