# serial-fetch

> Enqueues parallel requests and runs them serially.

## Install

```console
$ npm install serial-fetch
```

## Use

```js
import serialFetch from 'serial-fetch'

window.fetch = serialFetch(window.fetch)
```
