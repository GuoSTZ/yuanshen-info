
const path = require('path')
const getWebpackDevConfig = require('./webpack.dev')
const getWebpackProdConfig = require('./webpack.prod')

const initOptions = {
  remotes: {},
  port: 1446,
  env: 'development',
  namespace: 'capaa_database',
  // remotePublic: 'https://192.168.237.195/static/'
}

const getWebpackConfig = (options) => {
  const opt = {...initOptions, ...options}
  if (!opt.microFrontEndConfig) {
    try {
      // const microFrontEndConfig = require(`${path.join(process.cwd(), 'menu.json')}`)
      // opt.microFrontEndConfig = microFrontEndConfig
      opt.microFrontEndConfig = {}
    } catch (error) {
      opt.microFrontEndConfig = {}
    }
  }
  if (opt.env === 'production') {
    return getWebpackProdConfig(opt)
  }
  return getWebpackDevConfig(opt)
}

module.exports = getWebpackConfig
