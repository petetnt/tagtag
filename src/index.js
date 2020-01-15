import isTextLike from './is-text-like';
import { isHtmlVoidTag, isSvgVoidTag } from './void-tags';
import parseQuery from './parse-query';
import escapeHTML from './escape-html';

class Element {
  constructor (content) {
    this.content = content;
  }

  toString () {
    return this.content;
  }
}

export default function tag (query) {
  return function (...args) {
    const { tagName } = parseQuery(query);
    let { id, className } = parseQuery(query);
    const attributes = [];
    const content = [];

    args.forEach(arg => {
      if (isTextLike(arg)) {
        content.push(escapeHTML(arg));
      } else if (typeof arg === 'object') {
        if (arg instanceof Element) {
          content.push(arg.toString());
        } else {
          for (const key in arg) {
            if (key === 'id') {
              id = arg[key];
            } else if (key === 'class') {
              if (className) {
                className += ' ';
              }
              className += escapeHTML(arg[key]);
            } else {
              attributes.push(` ${key}="${escapeHTML(arg[key])}"`);
            }
          }
        }
      }
    });

    if (id) {
      attributes.push(` id="${id}"`);
    }

    if (className) {
      attributes.push(` class="${className}"`);
    }

    if (tagName === 'doctype html') {
      return `<!DOCTYPE html>${content.join('')}`;
    }

    if (isHtmlVoidTag(tagName)) {
      return new Element(`<${tagName}${attributes.join('')}>`);
    } else if (isSvgVoidTag(tagName)) {
      return new Element(`<${tagName}${attributes.join('')}/>`);
    } else {
      return new Element(`<${tagName}${attributes.join('')}>${content.join('')}</${tagName}>`);
    }
  };
}

tag.raw = function (str) {
  return new Element(str);
};

console.log(
  String(tag('h1')({ test: '<script>evil</script>' }, '<script>evil</script>'))
);
