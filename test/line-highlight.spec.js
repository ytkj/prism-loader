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
                lineHighlight: {
                    lineHeight: 24
                }
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

        it('div.line-highlight should be appended to pre element', () => {
            target(env);
            expect(env.$element.parent().children('div.line-highlight').length).to.equals(1);
        });

        it('div.line-highlight should have style top:xxx', () => {
            target(env);
            expect(env.$element.parent().children('div.line-highlight').css('top')).to.equals('216px');
        });

    });
});
