const expect = require('chai').expect;
const cheerio = require('cheerio');
const Prism = require('prismjs');

const lineNumber = require('../lib/line-numbers');

describe('lineNumber()', () => {

    let language,
        grammar,
        code,
        highlightedCode,
        highlightedHtml,
        $,
        $element,
        env;

    beforeEach(() => {
        language = 'typescript';
        grammar = Prism.languages[language];
        code =
`import Vue from 'vue';
import Component from 'vue-class-component';

import * as Template from './template.html';

@Template
@Component
export class HelloWorld extends Vue {

}`;
        highlightedCode =
`<span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">'vue'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> Component <span class="token keyword">from</span> <span class="token string">'vue-class-component'</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token operator">*</span> as Template <span class="token keyword">from</span> <span class="token string">'./template.html'</span><span class="token punctuation">;</span>

@Template
@Component
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">HelloWorld</span> <span class="token keyword">extends</span> <span class="token class-name">Vue</span> <span class="token punctuation">{</span>

<span class="token punctuation">}</span>`;
        highlightedHtml =
`<pre class="line-numbers" data-start="10">
    <code class="language-typescrip">${highlightedCode}
    </code>
</pre>`;
        $ = cheerio.load(highlightedHtml);
        $element = $('code');
        env = {
            code: code,
            language: language,
            grammar: grammar,
            highlightedCode: highlightedCode,
            $element: $element
        };
    });

    it('span.line-numbers-rows is appneded', () => {
        lineNumber(env);
        expect(env.$element.find('span.line-numbers-rows').length).to.equals(1);
    });

    it('span.line-numbers-rows has 10 child span', () => {
        lineNumber(env);
        expect(env.$element.find('span.line-numbers-rows').children().length).to.equals(10);
    });

    it('counter-reset property reflect data-start attribute', () => {
        lineNumber(env);
        expect(env.$element.parent().css('counter-reset')).to.equals('linenumber 9');
    });

});
