const expect = require('chai').expect;

describe('option.js', () => {

    describe('assignDefault()', () => {

        const target = require('../lib/option').assignDefault;

        it('if argument is null or undefined, return default options', () => {
            expect(target(null).languages.length).to.equals(6);
            expect(target(null).fontSize).to.equals(16);
            expect(target(undefined).languages.length).to.equals(6);
            expect(target(undefined).fontSize).to.equals(16);
            expect(target(null).cheerioOptions.decodeEntities).to.be.false;
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
            expect(outopts.fontSize).to.equals(16);
        });

        it('options.fontSize should be overridden', () => {
            let inopts = {
                fontSize: 14
            };
            let outopts = target(inopts);
            expect(outopts.languages.length).to.equals(6);
            expect(outopts.fontSize).to.equals(14);
        });

        it('options.cheerioOptions should be overriden', () => {
            let inopts = {
                cheerioOptions: {
                    xmlMode: true,
                },
            };
            let outopts = target(inopts);
            expect(outopts.cheerioOptions.xmlMode).to.be.true;
        });
    });
});
