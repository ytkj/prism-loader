const expect = require('chai').expect;

describe('option.js', () => {

    describe('assignDefault()', () => {

        const target = require('../lib/option').assignDefault;

        it('if argument is null or undefined, return default options', () => {
            expect(target(null).languages.length).to.equals(6);
            expect(target(null).lineHighlight.lineHeight).to.equals(24);
            expect(target(undefined).languages.length).to.equals(6);
            expect(target(undefined).lineHighlight.lineHeight).to.equals(24);
        });

        it('options.languages should be overridden', () => {
            let inopts = {
                languages: [
                    'typescript',
                    'html'
                ]
            };
            let outopts = target(inopts);
            expect(outopts.languages.length).to.equals(2);
            expect(outopts.lineHighlight.lineHeight).to.equals(24);
        });

        it('options.lineHighlight should be overridden', () => {
            let inopts = {
                lineHighlight: {
                    lineHeight: 21
                }
            };
            let outopts = target(inopts);
            expect(outopts.languages.length).to.equals(6);
            expect(outopts.lineHighlight.lineHeight).to.equals(21);
        });
    });
});
