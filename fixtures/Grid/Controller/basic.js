var Immutable = require('immutable')

var random = []
for (var i = 0; i <= 500; i++) {
  random.push({
    _id: i + '-id',
    title: i + '-id'
  })
}


module.exports = {
  items: random
}
