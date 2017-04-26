const LT = /\&lt;/g;
const GT = /\&gt;/g;
const AMP = /\&amp;/g;

exports.tag = function tag(str) {
    if (typeof str !== 'string') {
        return str;
    }
    return str.replace(LT, '<').replace(GT, '>');
}

exports.amp = function amp(str) {
    if (typeof str !== 'string') {
        return str;
    }
    return str.replace(AMP, '&');
}
