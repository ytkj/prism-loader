const defaultOptions = {
    lineHighlight: {
        lineHeight: 24
    }
};

function assignDefault(options = {}) {
    return Object.assign({}, defaultOptions, options);
}

exports.assignDefault = assignDefault;
