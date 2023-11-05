import { Configuration, HotModuleReplacementPlugin } from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

module.exports = (env, argv) => {
  const isDev = () => argv?.mode === 'development';

  return {
    mode: isDev() ? 'development' : 'production',
    entry: {
      bundle: path.resolve(__dirname, './', 'src/index.tsx'),
    },
    output: {
      filename: '[name].[chunkhash].js',
      chunkFilename: '[name].[chunkhash].chunk.js',
      clean: !isDev(),
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /(node_modules|\.webpack)/,
          use: {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        },
      ],
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin(),
      isDev() && new HotModuleReplacementPlugin(),
      isDev() && new ReactRefreshWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: 'index.html',
        inject: true,
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[chunkhash].css',
        chunkFilename: '[name].[chunkhash].chunk.css',
      }),
    ].filter(Boolean),
    resolve: {
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
      alias: {
        '@src': path.resolve(__dirname, './', 'src/'),
      },
    },
    stats: 'errors-warnings',
    optimization: {
      minimize: !isDev(),
      sideEffects: true,
      concatenateModules: true,
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: 10,
        minSize: 0,
        cacheGroups: {
          vendor: {
            name: 'vendors',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
          },
        },
      },
    },
    performance: {
      hints: false,
    },
    devtool: isDev() ? 'source-map' : undefined,
    devServer: {
      open: true,
    },
  } satisfies Configuration;
};
