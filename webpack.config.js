const path = require('path')
const getWebpackConfig = require('./config')

module.exports = getWebpackConfig({
  port: 1446,
  namespace: 'capaa_database',
  env: process.env.NODE_ENV,
  // remotePublic: 'https://192.168.237.195/static/',
  // moduleFederationOptions: {
  //   exposes: {

  //   },
  //   remotes:{
      
  //   }
  // }
})


