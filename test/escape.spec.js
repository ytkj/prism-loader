const expect = require('chai').expect;

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

        it('<div>foo</div> should be escaped.', () => {
            expect(target('<div>foo</div>')).to.equals('&lt;div&gt;foo&lt;/div&gt;');
        });
    });
});
