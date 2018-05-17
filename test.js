let FakePromise = require('./fakePromise')
let p = new FakePromise(function(resolve, reject) {
  reject('失败')
})

p
  .then(
    function(data) {
      console.log('data', data)
      return 'success'
    },
    function(err) {
      console.log('err', err)
      return 'err'
    }
  )
  .then(
    function(data) {
      console.log(data)
    },
    function(err) {
      console.log(err)
    }
  )
