"use strict";
async function asyncPool(poolLimit, array, iteratorFn) {
  var ret = [];
  var executing = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = async function _loop() {
      var item = _step.value;
      var p = Promise.resolve().then(function() {
        return iteratorFn(item, array);
      });
      ret.push(p);
      var e = p.then(function() {
        return executing.splice(executing.indexOf(e), 1);
      });
      executing.push(e);

      if (executing.length >= poolLimit) {
        await Promise.race(executing);
      }
    };

    for (
      var _iterator = array[Symbol.iterator](), _step;
      !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
      _iteratorNormalCompletion = true
    ) {
      await _loop();
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return Promise.all(ret);
}
