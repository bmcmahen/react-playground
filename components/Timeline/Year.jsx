import React, {Component, PropTypes} from 'react'

class Year extends Component {

  static propTypes = {
    year: PropTypes.number.isRequired
  }

  constructor(props){
    super(props)
  }

  render(){
    return (
      <li className='Year' tabindex='0'>
        <div className='Year__label-content'>
          {this.props.year}
        </div>
      </li>
    )
  }
}

export default Year
