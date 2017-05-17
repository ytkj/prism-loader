const expect = require('chai').expect;
const cheerio = require('cheerio');
const Prism = require('prismjs');

const lineHighlight = require('../lib/line-highlight');

describe('lineHighlight', () => {

    describe('onBeforeSanityCheck()', () => {

        const target = lineHighlight.onBeforeSanityCheck;

    });

    describe('onComplete()', () => {

        const target = lineHighlight.onComplete;
        let language,
            grammar,
            code,
            highlightedCode,
            highlightedHtml,
            $,
            $element,
            env,
            options;

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
`<pre class="line-numbers" data-line="9">
    <code class="language-typescrip">${highlightedCode}
    </code>
</pre>`;
            $ = cheerio.load(highlightedHtml);
            $element = $('code');
            options = {
                fontSize: 16
            };
            env = {
                code: code,
                language: language,
                grammar: grammar,
                highlightedCode: highlightedCode,
                $element: $element,
                options: options
            };

        });

        it('data-line="9", one div.line-highlight should be appended', () => {
            target(env);
            expect(env.$element.parent().children('div.line-highlight').length).to.equals(1);
        });

        it('data-line="9", div.line-highlight should have style top:216px', () => {
            target(env);
            expect(env.$element.parent().children('div.line-highlight').css('top')).to.equals('192px');
        });

        it('data-line="2-3,9", two div.line-highlight should be appended', () => {
            highlightedHtml =
`<pre class="line-numbers" data-line="2-3,9">
    <code class="language-typescrip">${highlightedCode}
    </code>
</pre>`;
            $ = cheerio.load(highlightedHtml);
            env.$element = $('code');
            target(env);
            expect(env.$element.parent().children('div.line-highlight').length).to.equals(2);
        });

        it('data-line="2-3,9", two div.line-highlight have style top:48px and top:216px', () => {
            highlightedHtml =
`<pre class="line-numbers" data-line="2-3,9">
    <code class="language-typescrip">${highlightedCode}
    </code>
</pre>`;
            $ = cheerio.load(highlightedHtml);
            env.$element = $('code');
            target(env);
            expect(env.$element.parent().children('div.line-highlight').eq(0).css('top')).to.equals('24px');
            expect(env.$element.parent().children('div.line-highlight').eq(1).css('top')).to.equals('192px');
        });

    });
});
