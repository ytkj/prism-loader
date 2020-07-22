const expect = require('chai').expect;
const cheerio = require('cheerio');

const loader = require('../lib/loader');

describe('loader()', () => {

    const target = loader;

    it('TypeScript code block should be highlighted', () => {
        let html =
`
<div>
    <h1>Hello World</h1>
    <p>
        Basic code is below.
    </p>
    <pre>
        <code class="language-typescript">
import Vue from 'vue';
import Component from 'vue-class-component';

import * as Template from './template.html';

@Template
@Component
export class HelloWorld extends Vue {

}
        </code>
    </pre>
</div>
`;
        let highlightedHtml = target(html);
        let $ = cheerio.load(highlightedHtml);
        expect($('pre code span.token.class-name').length).to.equals(2);
    });

    it('HTML code block should be highlighted', () => {
        let html =
`
<div>
    <h1>Hello World</h1>
    <p>
        Basic code is below.
    </p>
    <pre>
        <code class="language-markup">
            &lt;div class="container"&gt;
            &lt;/div&gt;
        </code>
    </pre>
</div>
`;
        let highlightedHtml = target(html);
        let $ = cheerio.load(highlightedHtml);
        expect($('pre code span.token.tag').length).to.equals(4);
        expect($('pre code span.token.attr-name').length).to.equals(1);
    });

    it('CSS should be highlighted', () => {
        let html =
`
<div>
    <h1>Hello World</h1>
    <p>
        Basic code is below.
    </p>
    <pre>
        <code class="language-css">
div {
    background-color: #7f7f7f;
}
        </code>
    </pre>
</div>
`;
        let highlightedHtml = target(html);
        $ = cheerio.load(highlightedHtml);
        expect($('pre code span.token.selector').length).to.equals(1);
        expect($('pre code span.token.property').length).to.equals(1);
    });

    it('All three code blocks should be highlighted', () => {

        let html =
`
<div>
    <h1>Hello World</h1>
    <p>
        Basic code is below.
    </p>
    <pre>
        <code class="language-typescript">
export class HelloWorld extends Vue {

}
        </code>
    </pre>
    <pre>
        <code class="language-markup">
            &lt;div class="container"&gt;
            &lt;/div&gt;
        </code>
    </pre>
    <pre>
        <code class="language-css">
div {
    background-color: #7f7f7f;
}
        </code>
    </pre>

</div>
`;
        let highlightedCode = target(html);
        $ = cheerio.load(highlightedCode);
        expect($('pre code span.token.class-name').length).to.equals(2);
        expect($('pre code span.token.tag').length).to.equals(4);
        expect($('pre code span.token.attr-name').length).to.equals(1);
        expect($('pre code span.token.selector').length).to.equals(1);
        expect($('pre code span.token.property').length).to.equals(1);
    });

    it('should not output an <html> tag if cheerioOption.xmlMode = true', () => {
        let html =
`
<pre>
<code class="language-markup">
    &lt;div class="container"&gt;
    &lt;/div&gt;
</code>
</pre>
`;

        let highlightedCode = target(html, {cheerioOption: {xmlMode: true}});
        $ = cheerio.load(highlightedCode, {xmlMode: true});
        expect($('html').length).to.equal(0);
    });

});
