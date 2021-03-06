import React, {Component, PropTypes} from 'react'

require('./Year.css')

class Year extends Component {

  static propTypes = {
    year: PropTypes.number.isRequired
  }

  constructor(props){
    super(props)
  }

  render(){
    return (
      <li
        data-year={this.props.year}
        className='Timeline__year masonry-item'
        tabIndex='0'>
          <div className='Year__label-content'>
            <span>{this.props.year}</span>
          </div>
      </li>
    )
  }
}

export default Year
