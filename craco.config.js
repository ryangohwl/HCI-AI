module.exports = function override(config, env) {
  // Do stuff with the webpack config...
  config.resolve.fallback = {
    ...config.resolve.fallback,
    crypto: false
  };
  return config;
};