function FakePromise(executor) {
  let self = this
  self.status = 'pendding'
  self.value = undefined
  self.reason = undefined
  function resolve(value) {
    if (self.status === 'pendding') {
      self.status = 'resolve'
      self.value = value
    }
  }
  function reject(reason) {
    if (self.status === 'pendding') {
      self.status = 'reject'
      self.reason = reason
    }
  }
  executor(resolve, reject)
}
FakePromise.prototype.then = function(onFulfilled, onRejected) {}
