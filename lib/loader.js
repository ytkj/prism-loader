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

const SELECTOR = 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code';

const cheerioOption = {
    decodeEntities: false
}

function loader(input, options) {

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

        if (/pre/i.test($parent.tagName)) {
            let parentClassName = $parent.attr('class');
            let replacedParentClassName = classNameUtils.addLanguageIfNotPresent(parentClassName, language);
            $parent.addClass(replacedParentClassName);
        }

        let code = $element.text();

        let highlightedCode = Prism.highlight(code, grammar);

        $element.text(highlightedCode);

    });

    return $.html();
}

module.exports = loader;
