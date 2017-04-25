const expect = require('chai').expect;
const cheerio = require('cheerio');

const loader = require('../lib/loader');

describe('loader()', () => {

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
            let a: number = 1;
        </code>
    </pre>
</div>
`;
        let highlightedHtml = loader(html);
        let $ = cheerio.load(highlightedHtml);
        expect($('pre code').html()).to.include('<span class="token keyword">let</span>');
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
            <h1>foo</h1>
            <p>foo</p>
        </code>
    </pre>
</div>
`;
        let highlightedCode = loader(html);
        console.log(highlightedCode);
        let $ = cheerio.load(highlightedCode);
    })
});
