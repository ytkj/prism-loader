const expect = require('chai').expect;

const classNameUtils = require('../lib/classNameUtils');

describe('classNameUtils', () => {

    describe('classNameUtils#notIncludeLanguage()', () => {

        const target = classNameUtils.notIncludeLanguage;

        it('if className is null, return true', () => {
            expect(target(null)).to.true;
        });

        it('if className is undefined, return true', () => {
            expect(target(undefined)).to.true;
        });

        it('if classname is hogehoge, return true', () => {
            expect(target('hogehoge')).to.true;
        });

        it('if className is lang-php, return false', () => {
            expect(target('lang-php')).to.false;
        });

        it('if className is lang-php[space]hoge, return false', () => {
            expect(target('lang-php hoge')).to.false;
        });

        it('if className is hoge[space]language-html, return false', () => {
            expect(target('hoge language-html')).to.false;
        });
    });

    describe('classNameUtils#getLanguageFromClassName()', () => {

        const target = classNameUtils.getLanguageFromClassName;

        it('if className is null, return empty string', () => {
            expect(target(null)).to.equals('');
        });

        it('if className is undefined, return empty string', () => {
            expect(target(undefined)).to.equals('');
        });

        it('if className is lang-html, return html', () => {
            expect(target('lang-html')).to.equals('html');
        });

        it('if className is language-TypeScript, return typescript', () => {
            expect(target('language-TypeScript')).to.equals('typescript');
        });
    });

    describe('classNameUtils#setLanguageIfNotPresent()', () => {

        const target = classNameUtils.addLanguageIfNotPresent;

        it('if className is null, return [space]language-<language>', () => {
            expect(target(null, 'html')).to.equals(' language-html');
        });

        it('if className is undefined, return [space]language-<language>', () => {
            expect(target(undefined, 'html')).to.equals(' language-html');
        });

        it('if className is lang-html, return [space]language-<language>', () => {
            expect(target('lang-html', 'php')).to.equals(' language-php');
        });

        it('if className is language-html, return [space]language-<language>', () => {
            expect(target('language-html', 'php')).to.equals(' language-php');
        });

        it('if className is hogehoge, return hogehoge[space]language-<language>', () => {
            expect(target('hogehoge', 'php')).to.equals('hogehoge language-php');
        });

        it('if className is hogehoge[space]lang-html, return hogehoge[space][space]language-<language>', () => {
            expect(target('hogehoge lang-html', 'php')).to.equals('hogehoge  language-php');
        });

        it('if className is lang-html[space]hogehoge, return [space]hogehoge[space]language-<language>', () => {
            expect(target('lang-html hogehoge', 'php')).to.equals(' hogehoge language-php');
        });

    });
})
