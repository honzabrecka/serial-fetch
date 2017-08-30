# serial-fetch

> Enqueues parallel requests and runs them serially.

## Install

```console
npm install serial-fetch
```

## Use

```js
import serialFetch from 'serial-fetch'

window.fetch = serialFetch(window.fetch)
```

## Build

```console
yarn tsc
```

## Test [![CircleCI](https://circleci.com/gh/honzabrecka/serial-fetch/tree/master.svg?style=svg&circle-token=85f54a95ed82cc06ed715eb5a63819c3e42d87c3)](https://circleci.com/gh/honzabrecka/serial-fetch/tree/master)

```console
yarn jest
```
