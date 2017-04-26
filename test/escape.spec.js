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

});
