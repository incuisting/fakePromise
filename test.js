let FakePromise = require('./fakePromise')
let p = new FakePromise(function(resolve, reject) {
  resolve()
})

p
  .then(
    function(data) {
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          resolve(1000)
        }, 1000)
      })
    },
    function(err) {
      console.log(err)
    }
  )
  .then(
    function(data) {
      console.log(data)
    },
    function(err) {
      console.log('err', err)
    }
  )
