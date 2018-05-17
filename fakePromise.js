function FakePromise(executor) {
  let self = this
  self.status = 'pendding'
  self.value = undefined
  self.reason = undefined
  function resolve() {}
  function reject() {}
  executor(resolve, reject)
}
FakePromise.prototype.then = function(onFulfilled, onRejected) {}
