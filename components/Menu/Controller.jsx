import React, {Component, PropTypes} from 'react'
import Menu from './Menu.jsx'

class MenuController extends Component {

  constructor(props){
    super(props)
    this.state = {isOpen: false}
  }

  render(){

    return (
      <Menu isOpen={this.state.isOpen}
        onRequestClose={this.close.bind(this)}
        onRequestOpen={this.open.bind(this)}>
        <button onClick={this.close.bind(this)}>Click me</button>
      </Menu>
    )
  }

  close(){
    this.setState({ isOpen: false })
  }

  open(){
    this.setState({ isOpen: true })
  }
}

export default MenuController
