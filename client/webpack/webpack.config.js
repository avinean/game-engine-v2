const base = require('./base.config');
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');

const index = process.argv.indexOf('--name');
const name = process.argv[index + 1];

module.exports = {
  ...base,
  name,
  entry: `./src/${name}/main.ts`,
  output: {
    path: path.resolve(__dirname, `../../server/client/${name}`)
  },
  plugins: [
    ...base.plugins,
    new CopyPlugin({
      patterns: [
        { from: `src/${name}/assets`, to: "./" },
      ],
    }),
  ],
};