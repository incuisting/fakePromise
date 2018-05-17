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
function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    reject(new TypeError('自己引用自己'))
  }
}
FakePromise.prototype.then = function(onFulfilled, onRejected) {
  let self = this
  let promise2
  if (self.status === 'resolved') {
    promise2 = new FakePromise(function(resolve, reject) {
      let x = onFulfilled(self.value)
      resolvePromise(promise2, x, resolve, reject)
    })
  }
  if (self.status === 'rejected') {
    promise2 = new FakePromise(function(resolve, reject) {
      let x = onRejected(self.reason)
      resolvePromise(promise2, x, resolve, reject)
    })
  }
  if (self.status === 'pendding') {
    promise2 = new FakePromise(function(resolve, reject) {
      self.onResolvedCallbacks.push(function() {
        let x = onFulfilled(self.value)
        resolvePromise(promise2, x, resolve, reject)
      })
      self.onRejectedCallbacks.push(function() {
        let x = onRejected(self.reason)
        resolvePromise(promise2, x, resolve, reject)
      })
    })
  }
  return promise2
}
module.exports = FakePromise
