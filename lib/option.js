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
    return Object.assign({}, defaultOptions, options);
}

exports.assignDefault = assignDefault;
