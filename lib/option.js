const mergeWith = require('lodash.mergewith');

const defaultOptions = {
    languages: [
        'markup',
        'typescript',
        'javascript',
        'css',
        'php',
        'java'
    ],
    fontSize: 16
};

function assignDefault(options = {}) {
    return mergeWith({}, defaultOptions, options, overrideEvenIfArray);
}

function overrideEvenIfArray(base, overrider) {
    if (Array.isArray(base)) {
        return overrider;
    }
}

exports.assignDefault = assignDefault;
