let FakePromise = require('./fakePromise')
let p = new FakePromise(function(resolve, reject) {
  throw new Error('错误')
})

p.then(
  function(data) {
    console.log('data', data)
  },
  function(err) {
    console.log('err', err)
  }
)
