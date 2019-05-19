// this file is used as is by create-react-app, no merging required
module.exports = {
  presets: ['react-app'],
  plugins: [
    [
      'babel-plugin-semantic-ui-react-transform-imports',
      {
        convertMemberImports: true,
        importType: 'es',
        addCssImports: false,
      },
    ],
    'lodash',
  ],
};
