
const chalk = require('chalk')
// const htmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CopyPlugin = require('copy-webpack-plugin'); // 复制文件
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const { resolveApp } = require('./utils')

const common = {
  externals: {
    // react: 'react',
    // 'react-dom': 'MC_REACTDOM',
  }, // 外部引入的资源，避免打包到自己的bundle中
  resolve: {
    alias: {
      '@': resolveApp('./src'),
      'handlebars': 'handlebars/dist/handlebars.js'
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    mainFiles: ['index.js', 'index.jsx', 'index.ts', 'index.tsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: resolveApp('./src'),
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            plugins: [
              [
                "import", {
                  libraryName: "antd",
                  style: true
                }
              ]
            ]
          }
        }]
      },
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 大于10kb将会启用file-loader将文件单独导出
          }
        },
        generator: {
          filename: 'images/[name][ext]'
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]',
        }
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin({ // 进度条
      format: `  :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`
    })
  ]
}

module.exports = common
