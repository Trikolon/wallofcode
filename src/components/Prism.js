/*
 The MIT License (MIT)

 Copyright (c) egoist <0x142857@gmail.com> (https://egoistian.com)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

function assign(obj) {
  for (let i = 1; i < arguments.length; i += 1) {
    // eslint-disable-next-line no-param-reassign,prefer-rest-params,no-restricted-syntax,guard-for-in
    for (const p in arguments[i]) obj[p] = arguments[i][p];
  }
  return obj;
}

export default {
  functional: true,
  props: {
    code: {
      type: String,
    },
    inline: {
      type: Boolean,
      default: false,
    },
    language: {
      type: String,
      default: 'markup',
    },
  },
  render(h, ctx) {
    const code = ctx.props.code || ctx.children[0].text;
    const { inline, language } = ctx.props;
    const prismLanguage = Prism.languages[language];
    const className = `language-${language}`;

    if (process.env.NODE_ENV === 'development' && !prismLanguage) {
      throw new Error(`Prism component for language "${language}" was not found, did you forget to register it? See all available ones: https://cdn.jsdelivr.net/npm/prismjs/components/`);
    }

    const codeElClasses = inline ? [ctx.data.class, className] : className;
    const codeEl = h('code', {
      class: codeElClasses,
      domProps: {
        innerHTML: Prism.highlight(code, prismLanguage),
      },
    });

    if (inline) {
      return codeEl;
    }

    return h(
      'pre',
      assign({}, ctx.data, {
        class: [ctx.data.class, className],
      }),
      [
        codeEl,
      ],
    );
  },
};
