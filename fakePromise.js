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
      self.onResolvedCallbacks.forEach(function(fn) {
        fn()
      })
    }
  }
  function reject(reason) {
    if (self.status === 'pendding') {
      self.status = 'rejected'
      self.reason = reason
      self.onRejectedCallbacks.forEach(function(fn) {
        fn()
      })
    }
  }
  try {
    executor(resolve, reject)
  } catch (error) {
    reject(error)
  }
}
FakePromise.prototype.then = function(onFulfilled, onRejected) {
  let self = this
  let promise2
  if (self.status === 'resolved') {
    promise2 = new FakePromise(function(resolve, reject) {
      onFulfilled(self.value)
    })
  }
  if (self.status === 'rejected') {
    promise2 = new FakePromise(function(resolve, reject) {
      onRejected(self.reason)
    })
  }
  if (self.status === 'pendding') {
    promise2 = new FakePromise(function(resolve, reject) {
      self.onResolvedCallbacks.push(function() {
        onFulfilled(self.value)
      })
      self.onRejectedCallbacks.push(function() {
        onRejected(self.reason)
      })
    })
  }
  return promise2
}
module.exports = FakePromise
