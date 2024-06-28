/* eslint-disable no-undef */
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

module.exports = (() => {
  const conf = getDefaultConfig(__dirname);

  const { transformer, resolver } = conf;

  conf.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  };
  conf.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...resolver.sourceExts, 'svg'],
  };

  return mergeConfig(conf, config);
})();

// module.exports = mergeConfig(getDefaultConfig(__dirname), config);
