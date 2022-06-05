const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = webpack.container;

/**
 *
 * @param {String} relativePath 现对于应用根目录的相对路径
 * @returns {String}
 */
const resolveApp = relativePath => path.resolve(process.cwd(), relativePath);

/**
 *
 * @param {String} env ENV环境变量
 * @param {Object} params
 * @param {String} params.name remoteApp的name
 * @param {Number | String} params.port 本地localhost prot, 该参数将开启本地port资源
 * @param {String} params.url remoteApp的url地址
 * @param {String} remotePublic 默认的remote public地址
 * @returns {String}
 */
const getRemoteEntryUrl = (env, { name, port, url }, remotePublic) => {
  if (env === 'production') {
    return `${name}@[HOST_URL]${name.replace('mc_', '')}/remoteEntry.js`;
  } else if (port) {
    return `${name}@//localhost:${port}/remoteEntry.js`;
  } else if (url) {
    const newUrl = url.includes('//') ? url : `//${url}`;
    return `${name}@${newUrl}`;
  }
  return `${name}@${remotePublic}${name.replace('mc_', '')}/remoteEntry.js`;
};

/**
 *
 * @param {Array} remotes remote数组
 * @returns
 */
const getRemotePublicSrc = remotes =>
  Object.keys(remotes)
    .map(key => {
      if (key === 'mc_common' && key === 'mc_components') return '';
      const remote = remotes[key];
      if (remote) {
        const remoteUrl = remote.split('@')[1];
        return remoteUrl ? `<script type="text/javascript" src="${remoteUrl}"></script>` : '';
      }
      return '';
    })
    .join('');

/**ßßß
 *
 * @param {Object} params
 * @param {String} params.env ENV环境变量
 * @param {Array} params.remotes remote数组
 * @param {String} params.remotePublic 默认的remote public地址
 * @returns
 */
const getEntryRemotes = ({ env, remotes, remotePublic }) => {
  const currentRemotes = {
    mc_common: getRemoteEntryUrl(env, { name: 'mc_common' }, remotePublic),
    mc_components: getRemoteEntryUrl(env, { name: 'mc_components' }, remotePublic),
  };
  if (Array.isArray(remotes)) {
    remotes.map(remote => {
      if (remote?.name) {
        currentRemotes[remote?.name] = getRemoteEntryUrl(env, remote, remotePublic);
      }
      return '';
    });
  }
  if (typeof remotes === 'object') {
    Object.keys(remotes).map(key => {
      const remote = remotes[key];
      currentRemotes[key] = getRemoteEntryUrl(env, { name: key, ...remote }, remotePublic);
      return '';
    });
  }
  return currentRemotes;
};

const addHtmlWebpackPlugin = ({ env, namespace, remotePublic, microFrontEndConfig, moduleFederationOptions = {} }) => {
  const { remotes = {} } = moduleFederationOptions;
  const entryRemotes = getEntryRemotes({ env, remotes, remotePublic });
  let options = {
    ENV: 'production',
    HOST_URL: '',
    cssString: '',
    jsString: '',
    publicPath: `/static/${namespace}/`,
    MicroFrontEndConfig: '',
  };
  if (env === 'development') {
    console.log('entryRemotes ======', entryRemotes);
    console.log('getRemotePublicSrc ======', getRemotePublicSrc(entryRemotes));
    options = {
      ENV: 'development',
      HOST_URL: remotePublic,
      cssString: '',
      publicPath: '/',
      jsString: getRemotePublicSrc(entryRemotes),
      MicroFrontEndConfig: JSON.stringify(microFrontEndConfig),
    };
  }
  return new htmlWebpackPlugin({
    filename: 'index.html',
    hash: true, // 为CSS文件和JS文件引入时，添加唯一的hash，破环缓存非常有用

    template: resolveApp('./public/index.ejs'),
    ...options,
  });
};

const addModuleFederationPlugin = ({ env, namespace, remotePublic, moduleFederationOptions = {} }) => {
  const { remotes = {} } = moduleFederationOptions;
  const entryRemotes = getEntryRemotes({ env, remotes, remotePublic });
  const { mc_common, mc_components } = entryRemotes;
  console.log('================= add ModuleFederationPlugin =================');
  const options = {
    name: namespace,
    filename: 'remoteEntry.js',
    ...moduleFederationOptions,
    remotes: {
      ...entryRemotes,
    },
  };
  return new ModuleFederationPlugin(options); // add ModuleFederationPlugin
};

module.exports = {
  resolveApp,
  addHtmlWebpackPlugin,
  addModuleFederationPlugin,
};
