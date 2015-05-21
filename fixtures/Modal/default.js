var React = require('react')

function onRequestClose(){
  console.log('requesting closeee')
}

module.exports = {
  isOpen: false,
  onRequestClose: onRequestClose,
  children: (
    <h2>Hello world</h2>
  )
}
