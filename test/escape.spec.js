const os = require('os');
const expect = require('chai').expect;
const cheerio = require('cheerio');

const escape = require('../lib/escape');

describe('escape', () => {

    describe('escape#tag()', () => {

        const target = escape.tag;

        it('if argument is null, return null', () => {
            expect(target(null)).to.equals(null);
        });

        it('if argument is undefined, return undefined', () => {
            expect(target(undefined)).to.equals(undefined);
            expect(target()).to.equals(undefined);
        });

        it('&lt;div&gt;foo&lt;/div&gt; should be de-escaped.', () => {
            expect(target('&lt;div&gt;foo&lt;/div&gt;')).to.equals('<div>foo</div>');
        });

    });

    describe('escape#amp()', () => {

        const target = escape.amp;

        it('if argument is null, return null', () => {
            expect(target(null)).to.equals(null);
        });

        it('if argument is undefined, return undefined', () => {
            expect(target(undefined)).to.equals(undefined);
            expect(target()).to.equals(undefined);
        });

        it('&amp;lt;div&amp;gt; is de-escaped', () => {
            expect(target('&amp;lt;div&amp;gt;')).to.equals('&lt;div&gt;');
        });

    });

    describe('removePreCodeCRLF()', () => {

        const target = escape.removePreCodeCRLF;
        const cheerioOption = { decodeEntities: false };
        const SELECTOR = 'pre>code[class*="language-"]';

        it('basic pattern', () => {
            const html =
`<pre>
    <code class="language-typescript">
let a: number = 1;
let b: string = 'foo';
    </code>
</pre>`;
            const $ = cheerio.load(html, cheerioOption);
            const input = $(SELECTOR).parent().html();
            const expectation =
`    <code class="language-typescript">
let a: number = 1;
let b: string = 'foo';
    </code>
`;
            expect(target(input)).to.equals(expectation);
        });

        it('w/o space', () => {
            const html =
`<pre>
<code class="language-typescript">
let a: number = 1;
let b: string = 'foo';
    </code>
</pre>`;
            const $ = cheerio.load(html, cheerioOption);
            const input = $(SELECTOR).parent().html();
            const expectation =
`<code class="language-typescript">
let a: number = 1;
let b: string = 'foo';
    </code>
`;
            expect(target(input)).to.equals(expectation);
        });

        it('w/o CRLF', () => {
            const html =
`<pre><code class="language-typescript">
let a: number = 1;
let b: string = 'foo';
    </code>
</pre>`;
            const $ = cheerio.load(html, cheerioOption);
            const input = $(SELECTOR).parent().html();
            const expectation =
`<code class="language-typescript">
let a: number = 1;
let b: string = 'foo';
    </code>
`;
            expect(target(input)).to.equals(expectation);
        });

        it('with indent', () => {
            const html =
`
    <pre>
        <code class="language-typescript">
let a: number = 1;
let b: string = 'foo';
        </code>
    </pre>
`;
            const $ = cheerio.load(html, cheerioOption);
            const input = $(SELECTOR).parent().html();
            const expectation =
`        <code class="language-typescript">
let a: number = 1;
let b: string = 'foo';
        </code>
    `;
            expect(target(input)).to.equals(expectation);
        });
    });

    describe('removeCodePreCRLF()', () => {
        const target = escape.removeCodePreCRLF;
        const cheerioOption = { decodeEntities: false };
        const SELECTOR = 'pre>code[class*=language-]';

        it('basic pattern', () => {
            const html =
`<pre>
    <code class="language-typescript">
let a: number = 1;
let b: string = 'foo';
    </code>
</pre>`;
            const $ = cheerio.load(html, cheerioOption);
            const input = $(SELECTOR).parent().html();
            const expectation =
`    <code class="language-typescript">
let a: number = 1;
let b: string = 'foo';
    </code>`;
            expect(target(input)).to.equals(expectation);
        });

        it('w/o CRLF', () => {
            const html =
`<pre>
    <code class="language-typescript">
let a: number = 1;
let b: string = 'foo';
    </code></pre>`;
            const $ = cheerio.load(html, cheerioOption);
            const input = $(SELECTOR).parent().html();
            const expectation =
`    <code class="language-typescript">
let a: number = 1;
let b: string = 'foo';
    </code>`;
            expect(target(input)).to.equals(expectation);
        });

        it('with indent', () => {
            const html =
`
    <pre>
        <code class="language-typescript">
let a: number = 1;
let b: string = 'foo';
        </code>
    </pre>
`;
            const $ = cheerio.load(html, cheerioOption);
            const input = $(SELECTOR).parent().html();
            const expectation =
`        <code class="language-typescript">
let a: number = 1;
let b: string = 'foo';
        </code>`;
            expect(target(input)).to.equals(expectation);
        });

    });

});
