# prism-loader

Code brush for [Prism.js](http://prismjs.com/) in build process, with Webpack >= 2.

## Example

### Input

```html
<pre>
    <code class="language-typescript">
let a: number = 1;
    </code>
</pre>
```

### Output

```html
<pre class="language-typescript">
    <code class="language-typescript">
<span class="token keyword">let</span> a<span class="token punctuation">:</span> <span class="token keyword">number</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    </code>
</pre>
```

## Features

### Supported Languages

All the languages listed in [Prism.js Homepage](http://prismjs.com/#languages-list) are available.
Language should be supecified in loader options.

### Supported Plugins

Two plugins are available.

- [Line Highlight](http://prismjs.com/plugins/line-highlight/)
- [Line Numbers](http://prismjs.com/plugins/line-numbers/)

## Install

1. `npm install -D prism-loader`

## Usage

1. Configuration for Webpack >= 2
```javascript
module.exports = function(env) {
    /* ... */
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    /* ... */
                    {
                        loader: 'prism-loader',
                        options: {/* */}
                    }
                    /* ... */
                ]
            }
        ]
    },
    /* ... */
}
```
2. Markup HTML Template file in the same manner as usual Prism.js usage.
```HTML
<h1>TypeScript Code Example</h1>
<pre class="line-numbers" data-line="1">
    <code class="language-typescript">
let a: number = 1;
    </code>
</pre>
```

## API

### `Options.languages`

- Type: `Array<string>`
- Default: `[ 'markup', 'typescript', 'javascript', 'css', 'php', 'java']`

Specify language list you want to highlight.
Available strings are listed in [Prism.js Homepage](http://prismjs.com/#languages-list).

### `Options.fontSize`

- Type: `number`
- Default: `16`

Specify CSS `font-size` property.
This value is set to inline style of `<pre>` element,
and 1.5 times value is used to calculate position-top of line highlight block, if line-highlight plugin is enabled.

This value should be **even number**.
[see here](https://github.com/PrismJS/prism/blob/v1.6.0/plugins/line-highlight/prism-line-highlight.js#L16).

### `Options.cheerioOptions`

- Type: `Object`
- Default: `{decodeEntities: false}`

Specify options for `cheerio`. For full list of options, [see here](https://github.com/cheeriojs/cheerio#loading).

## Note

This loader only prvide code-highlighting, but CSS style.
You must load Prism.js CSS file in some way.

### Example


a. Using `link` tag
```HTML
<link rel="stylesheet" href="node_modules/prismjs/themes/prism-coy.css">
<link rel="stylesheet" href="node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css">
<link rel="stylesheet" href="node_modules/prismjs/plugins/line-highlight/prism-line-highlight.css">
```
b. Usin CSS module (with css-loader and style-loader)
```javascript
import 'prismjs/themes/prism-coy.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/line-highlight/prism-line-highlight.css';
```

## Setup for Developers

1. Clone repository
    1. `git clone https://github.com/ytkj/prism-loader.git`
    2. `cd prism-loader`
    3. `npm install`
2. Run unit-test
    1. `npm test`
3. Run e2e-test
    1. `cd test/webpack`
    2. `npm install`
    3. `npm test`
    4. Open http://localhost:3030/test01.html
