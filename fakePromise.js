function FakePromise(executor) {
  function resolve() {}
  function reject() {}
  executor(resolve, reject)
}
FakePromise.prototype.then = function(onFulfilled, onRejected) {}
