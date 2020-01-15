# tagtag
Easy HTML templating with JS. Tagtag prints out HTML string, so it's especially useful with Node.js (works in browsers as well). Express template engine middleware coming soon!

# Install
`npm i tagtag`

# Usage
## Import / require
```js
// If you're using ES modules:
import tag from 'tagtag'

// If you're using CommonJS modules:
const tag = require('tagtag');
```
## tag(query)(...args)
```js
tag('h1')('Hello world!').toString(); // <h1>Hello world!</h1>
String(tag('.hello')('world')); // <div class="hello">world</div>
String(tag('#hello.world')('!')); // <div id="hello" class="world">!</div>
```

```js
const doc = tag('doctype html');
const html = tag('html');
const head = tag('head');
const meta = tag('meta');
const title = tag('title');
const body = tag('body');
const h1 = tag('h1');

String(doc(
  html(
    head(
      meta({ charset: 'utf-8' }),
      title('Hello tagtag!')
    ),
    body(
      h1('Hello tagtag!')
    )
  )
)) // <!DOCTYPE html><html><head><meta charset="utf-8"><title>Hello tagtag!</title></head><body><h1>Hello tagtag!</h1></body></html>
```

## Escaping
Notice tagtag escapes text content and attributes by default! If you want to print out raw text, please use:
```js
String(body(tag.raw('<script alert("Evil!")</script>'));
```

or:
```js
String(body({ $raw: '<script alert("Evil!")</script>' }));
```
