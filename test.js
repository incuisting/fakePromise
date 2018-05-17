let FakePromise = require('./fakePromise')
let p = new FakePromise(function(resolve, reject) {
  setTimeout(function() {
    resolve(100)
  }, 1000)
})

p.then(
  function(data) {
    console.log('data', data)
  },
  function(err) {
    console.log('err', err)
  }
)
