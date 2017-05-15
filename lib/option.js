const mergeWith = require('lodash.mergewith');
const isArray = require('lodash.isarray');

const defaultOptions = {
    languages: [
        'markup',
        'typescript',
        'javascript',
        'css',
        'php',
        'java'
    ],
    lineHighlight: {
        lineHeight: 24
    }
};

function assignDefault(options = {}) {
    return mergeWith({}, defaultOptions, options, overrideEvenIfArray);
}

function overrideEvenIfArray(base, overrider) {
    if (isArray(base)) {
        return overrider;
    }
}

exports.assignDefault = assignDefault;
