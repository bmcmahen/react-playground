import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'

require('./Menu.css')

class Menu extends Component {

  displayName = 'Menu'

  static proptTypes = {
    onRequestClose: PropTypes.func.isRequired,
    onRequestOpen: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired
  }

  constructor(props){
    super(props)
    this.state = {}
  }

  render(){

    const classes = classNames({
      'Menu': true,
      'open': this.props.isOpen
    })

    // todo: accessibility! the button should have descriptive text.
    return (
      <div className={classes}>
        <i role='button' onClick={this.toggleState.bind(this)}>
          <span>
            <p/>
            <p/>
            <p/>
          </span>
        </i>
        {this.props.children}
      </div>
    )
  }

  toggleState(){
    if (this.props.isOpen) {
      this.props.onRequestClose()
    } else {
      this.props.onRequestOpen()
    }
  }
}

export default Menu
