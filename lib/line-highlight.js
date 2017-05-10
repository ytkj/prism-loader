const Prism = require('prismjs');
const $ = require('cheerio');

function onBeforeSanityCheck(env) {
    let $pre = env.$element.parent();
    let lines = $pre.attr('data-line');

    if ($pre.length === 0 || !lines) {
        return;
    }

    let num = 0;

    $pre.find('.line-highlight').each($line => {
        num += $line.text().length;
        $line.remove();
    })

	// Remove extra whitespace
	if (num && /^( \n)+$/.test(env.code.slice(-num))) {
		env.code = env.code.slice(0, -num);
	}
}

function onComplete(env) {
    let $pre = env.$element.parent();
    let lines = $pre.attr('data-line');

    if ($pre.length === 0 || !lines) {
        return;
    }

    let ranges = lines.replace(/\s+/g, '').split(',');
    let offset = $pre.data('line-offset') - 0 || 0;
    let lineHeight = env.options.lineHighlight.lineHeight;

    ranges.forEach(range => {
        range = range.split('-');
        let start = range[0] - 0;
        let end = range[1] - 0 || start;
        let styleTop = ( start - offset  ) * lineHeight + 'px';

        let $line = $('<div>')
            .text(Array(end - start + 2).join(' \n'))
            .attr('aria-hidden', true)
            .addClass('line-highlight')
            .css('top', styleTop)

        if ($pre.hasClass('line-numbers')) {
            $pre.append($line);
        } else {
            $line.data('start', start);
            if (end > start) {
                $line.data('end', end);
            }
            $code = $pre.find('code');
            if ($code.length !== 0) {
                $code.append($line);
            } else {
                $pre.append($line);
            }
        }
    });
}

Prism.hooks.add('before-sanity-check', onBeforeSanityCheck);
Prism.hooks.add('complete', onComplete);
module.exports.onBeforeSanityCheck = onBeforeSanityCheck;
module.exports.onComplete = onComplete;
