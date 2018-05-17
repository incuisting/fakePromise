let FakePromise = require('./fakePromise')
let p = new FakePromise(function(resolve, reject) {
  resolve()
})

p
  .then(
    function(data) {
      return '1000'
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
