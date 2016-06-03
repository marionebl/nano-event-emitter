# nano-event-emitter

Minimal extendable jQuery-style EventEmitter

[![npm](https://img.shields.io/npm/dt/nano-event-emitter.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/nano-event-emitter)
[![Travis branch](https://img.shields.io/travis/marionebl/nano-event-emitter/master.svg?maxAge=2592000?style=flat-square)](https://travis-ci.org/marionebl/nano-event-emitter)

## Installation and Usage

### Module bundlers

Install with npm and bundle with `rollup`, `browserify`, `webpack`
or any other CommonJS compatible module bundler.

**Install**

```shell
npm install --save nano-event-emitter
```

**Use**

```js
// usage.js
import NanoEventEmitter from 'nano-event-emitter';
const eventEmitter = NanoEventEmitter.create();
```

**Bundle**

```shell
browserify usage.js > bundle.js
rollup usage.js > bundle.js
```

### CDN

Embed into your HTML document directly via `script`.

```html
<!doctype html>
<html>
  <head>
  </head>
  <body>
    <script src="https://wzrd.in/standalone/nano-event-emitter@latest"></script>
  </bod>
</html>
```

Available from CDN:

-   [Development](https://wzrd.in/debug-standalone/nano-event-emitter@latest)
-   [Production](https://wzrd.in/standalone/nano-event-emitter@latest)

## API

### NanoEventEmitter

[src/index.js:19-155](https://github.com/marionebl/nano-event-emitter/blob/fdea48176a882258e66903f3abd93b0dd8d9d72e/src/index.js#L19-L155 "Source code on GitHub")

An EventEmitter

**Examples**

````javascript
    ```js
    import NanoEventEmitter from 'nano-event-emitter';
    const eventEmitter = new NanoEventEmitter();
    ```
````

#### on

[src/index.js:68-79](https://github.com/marionebl/nano-event-emitter/blob/fdea48176a882258e66903f3abd93b0dd8d9d72e/src/index.js#L68-L79 "Source code on GitHub")

Attach an observer for one or more eventNames.

**Parameters**

-   `eventNames` **!([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>)** array or string of space seperated event names
-   `observer` **ObserverCallback** observer to invoke for eventNames

**Examples**

````javascript
    ```js
    import NanoEventEmitter from 'nano-event-emitter';
    const eventEmitter = NanoEventEmitter.create();

    eventEmitter.on('event', () => { console.log('event'); });
    eventEmitter.on('more-event', () => { console.log('more-event'); });
    eventEmitter.on(['even', 'more', 'events'], () => { console.log('even more events'); });

    eventEmitter.emit(['event', 'more-event']);
    // console: event
    // console: more-event

    eventEmitter.emit('even more events');
    // console: even more events
    // console: even more events
    // console: even more events
    ```
````

Returns **this** 

#### off

[src/index.js:113-134](https://github.com/marionebl/nano-event-emitter/blob/fdea48176a882258e66903f3abd93b0dd8d9d72e/src/index.js#L113-L134 "Source code on GitHub")

Detach an observer for one or more eventNames.

**Parameters**

-   `eventNames` **!([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>)** array or string of space seperated event names
-   `observer` **\[?ObserverCallback]** reference to observer function to detach. All observer functions for all eventNames are detached if omitted

**Examples**

````javascript
    ```js
    import NanoEventEmitter from 'nano-event-emitter';
    const eventEmitter = NanoEventEmitter.create();

    const yetAnotherObserver = () => console.log('yet-another-observer');

    eventEmitter.on('yet-another-event', () => { console.log('yet-another-event'); });
    eventEmitter.on('yet-another-event', () => { console.log('yet-another-event'); });
    eventEmitter.on('yet-another-event', yetAnotherObserver);

    eventEmitter.emit(['yet-another-event']);
    // console: yet-another-event
    // console: yet-another-event
    // console: yet-another-observer

    eventEmitter.off('yet-another-event', yetAnotherObserver);
    eventEmitter.emit('yet-another-event');
    // console: yet-another-event
    // console: yet-another-event

    eventEmitter.off('yet-another-event');
    eventEmitter.emit('yet-another-event');
    ```
````

Returns **this** 

#### emit

[src/index.js:143-154](https://github.com/marionebl/nano-event-emitter/blob/fdea48176a882258e66903f3abd93b0dd8d9d72e/src/index.js#L143-L154 "Source code on GitHub")

Emit one or more events, invoking registered observers with optional args

**Parameters**

-   `eventNames` **!([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>)** array or string of space seperated event names
-   `args` **...** 

Returns **this** 

#### create

[src/index.js:38-40](https://github.com/marionebl/nano-event-emitter/blob/fdea48176a882258e66903f3abd93b0dd8d9d72e/src/index.js#L38-L40 "Source code on GitHub")

Create a NanoEventEmitter instance.

**Parameters**

-   `args` **...** 

**Examples**

````javascript
    ```js
    import NanoEventEmitter from 'nano-event-emitter';
    const eventEmitter = NanoEventEmitter.create();
    ```
````

Returns **** NanoEventEmitter
