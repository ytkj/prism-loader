const loaderUtils = require('loader-utils');

const loader = require('./lib/loader');

module.exports = function(input) {
    let options = loaderUtils.getOptions(this);
    return loader(input, options);
}
