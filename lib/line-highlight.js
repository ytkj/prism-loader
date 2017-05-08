const Prism = require('prismjs');
const $ = require('cheerio');

function onBeforeSanityCheck(env) {

}

function onComplete(env) {

}

Prism.hooks.add('before-sanity-check', onBeforeSanityCheck);
Prism.hooks.add('complete', onComplete);
module.exports.onBeforeSanityCheck = onBeforeSanityCheck;
module.exports.onComplete = onComplete;
