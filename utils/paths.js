const path = require('path');
const root = path.resolve(process.cwd());

module.exports = {
  assets: `${root}/assets`,
  src: `${root}/src`,
  config: `${root}/config`,
  logs: `${root}/logs`,
  public: `${root}/public`,
  server: `${root}/server`,
  storage: `${root}/storage`,
  utils: `${root}/utils`
};
