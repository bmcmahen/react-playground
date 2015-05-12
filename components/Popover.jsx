import React, {PropTypes, Component} from 'react'
import classNames from 'classnames'

// popover styles
require('./Popover.css')

/**
 * Popover class
 */

class Popover extends Component {

  displayName = 'Popover'

  static propTypes = {
    visible: PropTypes.bool,
    content: PropTypes.node.isRequired,
    style: PropTypes.object.isRequired,
    role: PropTypes.string,
    uid: PropTypes.string.isRequired
  }

  constructor(props){
    super(props)
    this.state = {}
  }

  render() {

    return (
      <div
        className='Popover'
        id={this.props.uid}
        role={this.props.role}
        style={this.props.style}>
          {this.props.content}
      </div>
    )

  }
}

export default Popover
