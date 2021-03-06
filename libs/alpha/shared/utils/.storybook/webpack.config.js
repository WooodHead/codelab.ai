const rootWebpackConfig = require('../../../../../.storybook/webpack.config')

module.exports = async ({ config, mode }) => {
  // eslint-disable-next-line no-param-reassign
  config = await rootWebpackConfig({ config, mode })

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
  })

  return config
}
