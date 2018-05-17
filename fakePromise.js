function FakePromise(executor) {
  let self = this
  self.status = 'pendding'
  self.value = undefined
  self.reason = undefined
  self.onResolvedCallbacks = []
  self.onRejectedCallbacks = []
  function resolve(value) {
    if (self.status === 'pendding') {
      self.status = 'resolved'
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
FakePromise.prototype.then = function(onFulfilled, onRejected) {
  let self = this
  if (self.status === 'resolved') {
    onFulfilled(self.value)
  }
  if (self.status === 'rejected') {
    onRejected(self.reason)
  }
  if (self.status === 'pendding') {
    self.onResolvedCallbacks.push(function() {
      onFulfilled(self.value)
    })
    self.onRejectedCallbacks.push(function() {
      onRejected(self.reason)
    })
  }
}
