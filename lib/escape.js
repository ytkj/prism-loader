const LT = /\</g;
const GT = /\>/g;

exports.tag = function tag(str) {
    if (typeof str !== 'string') {
        return str;
    }
    return str.replace(LT, '&lt;').replace(GT, '&gt;');
}
