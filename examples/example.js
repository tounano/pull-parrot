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

