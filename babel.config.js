function isServer({ target }) {
  return target === 'server';
}

module.exports = (api) => {
  const presets = ['@babel/env'];

  return api.caller(isServer)
    ? {
        presets,
        targets: { node: 'current' },
      }
    : {
        presets,
      };
};
