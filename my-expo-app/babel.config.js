module.exports = function (api) {
  api.cache(true);
  let plugins = [];

  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],

    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          allowUndefined: false,
        },
      ],
    ],
  };
};
