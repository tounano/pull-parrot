# pull-parrot

Clone a pull-stream manually.

Parrot stream is a pushable stream that let's you push both `end` and `data`. It's mainly useful for creating other
pull-stream modules.

`parrot-stream` will end once an error happened inside a sink or once you invoke `end`.

## Usage

### parrot.push(end, data);

Push `end` and `data` as you get them.

### parrot.end(reason)

This will end the stream after it'll drain everything in the buffer. `reason` might be an `error`. Default is `true`.

## Example

```js
var pull = require("pull-stream");

var parrot = require("../")();

parrot.push(null, 1)
parrot.push(null, 2)
parrot.push(new Error(), null)
parrot.push(null, 3)
parrot.end()

pull(
  parrot,
  pull.log()
)
```

## install

With [npm](https://npmjs.org) do:

```
npm install pull-parrot
```

## license

MIT