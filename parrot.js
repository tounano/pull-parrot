var pull = require("pull-stream");

module.exports = pull.Source( function () {
  var ended, ending, output = [], cbs = []

  function drain() {
    if (ended && output.length)
      output = [];

    while (output.length && cbs.length)
      (function (end, data){
        cbs.shift()(end, data);
      })(output[0][0], output.shift()[1]);

    while (ended && cbs.length)
      cbs.shift()(ended);

    if (ending && !output.length) {
      ended = ending;
      ending = null;
      drain();
    }
  }

  function read (end, cb) {
    ended = ended || end;
    cbs.push(cb);

    drain();
  }

  read.push = function (end, data) {
    if (ended || ending) return;
    output.push([end, data]);
    drain();
  }

  read.end = function (reason) {
    ending = reason || true;
    drain();
  }

  return read;
});