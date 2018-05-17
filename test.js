let FakePromise = require('./fakePromise')
let p = new FakePromise(function(resolve, reject) {
  reject('xx')
})

p
  .then(
    function(data) {
      console.log('data', data)
      return 'success'
    },
    function(err) {
      throw new Error('失败')
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
