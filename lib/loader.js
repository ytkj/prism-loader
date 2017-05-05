const cheerio = require('cheerio');
const Prism = require('prismjs');
require('prismjs/components/prism-typescript');

const LANGUAGES = [
    'markup',
    'typescript',
    'javascript',
    'css',
    'php',
    'java'
];
LANGUAGES.forEach(language => require(`prismjs/components/prism-${language}`));

const classNameUtils = require('./classNameUtils');
const escape = require('./escape');

const SELECTOR = 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code';

const cheerioOption = {
    decodeEntities: false
}

require('./line-numbers');

function loader(input, options) {

    Prism.hooks.run('before-highlightall', {selector: SELECTOR});

    const $ = cheerio.load(input, cheerioOption);

    $(SELECTOR).each(function(index, element) {

        let language,
            grammar,
            $element = $(this),
            $parent = $element;

        while ($parent && classNameUtils.notIncludeLanguage($parent.attr('class'))) {
            $parent = $parent.parent();
        }

        if ($parent) {
            language = classNameUtils.getLanguageFromClassName($parent.attr('class'));
            grammar = Prism.languages[language];
        }

        let className = $element.attr('class');
        let replacedClassName = classNameUtils.addLanguageIfNotPresent(className, language);
        $element.addClass(replacedClassName);

        $parent = $element.parent();

        if (/pre/i.test($parent[0].tagName)) {
            let parentClassName = $parent.attr('class');
            let replacedParentClassName = classNameUtils.addLanguageIfNotPresent(parentClassName, language);
            $parent.addClass(replacedParentClassName);
        }

        let code = $element.text();
        // &amp; -> &
        code = escape.amp(code);
        // &lt; -> '<', &gt; -> '>'
        code = escape.tag(code);

        let env = {
            $element: $element,
            language: language,
            grammar: grammar,
            code: code
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
        Prism.hooks.run('after-highlight', env);
        Prism.hooks.run('complete', env);

    });

    return $.html();
}

module.exports = loader;
