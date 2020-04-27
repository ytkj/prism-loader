const cheerio = require('cheerio');
const Prism = require('prismjs');
const loadLanguages = require('prismjs/components/index');
const classNameUtils = require('./classNameUtils');
const escape = require('./escape');
const option = require('./option');
require('./line-numbers');
require('./line-highlight');

const SELECTOR = 'pre>code[class*="language-"]';

const cheerioOption = {
    decodeEntities: false
}

loadLanguages('typescript');

function loader(input, options) {

    options = option.assignDefault(options);

    Prism.hooks.run('before-highlightall', {selector: SELECTOR});

    const $ = cheerio.load(input, cheerioOption);
    const $elements = $(SELECTOR);

    if ($elements.length !== 0) {
        loadLanguages(options.languages);
    }

    $elements.each(function(index, element) {

        let $element = $(this),
            $parent = $element.parent(),
            language = classNameUtils.getLanguageFromClassName($element.attr('class')),
            grammar = Prism.languages[language];

        $parent.addClass(`language-${language}`).css('font-size', options.fontSize + 'px');

        let code = $element.html();
        // &amp; -> &
        code = escape.amp(code);
        // &lt; -> '<', &gt; -> '>'
        code = escape.tag(code);

        let env = {
            $element: $element,
            language: language,
            grammar: grammar,
            code: code,
            options: options
        };
        Prism.hooks.run('before-sanity-check', env);

        if (!env.code || !env.grammar) {
			if (env.code) {
				env.element.textContent = env.code;
			}
			Prism.hooks.run('complete', env);
			return;
		}
        Prism.hooks.run('before-highlight', env);

        let highlightedCode = Prism.highlight(code, grammar);
        env.highlightedCode = highlightedCode;
        Prism.hooks.run('before-insert', env);

        $element.text(highlightedCode);
        let beforeRemoveCRLF = $parent.html();
        let afterRemoveCRLF = escape.removeCodePreCRLF(escape.removePreCodeCRLF(beforeRemoveCRLF));
        $parent.html(afterRemoveCRLF);
        env.$element = $parent.contents();
        Prism.hooks.run('after-highlight', env);
        Prism.hooks.run('complete', env);

    });

    return $.html();
}

module.exports = loader;
