import React, {Component, PropTypes} from 'react'

class Map extends Component {

  static PropTypes = {
    dateRange: PropTypes.array.isRequired,
    onYearSelected: PropTypes.func.isRequired
  }

  constructor(props){
    super(props)
  }

  render(){
    return (
      <ul className='Map' aria-role='navigation'>
        {this.props.dateRange.map(this.renderDate)}
      </ul>
    )
  }

  renderDate(num){
    return (
      <li key={num} className='Map__item'>
        <a onClick={this.selectYear.bind(this, num)} href='#'>{num}</a>
      </li>
    );
  }

  selectYear(e, num){
    e.preventDefault()
    this.props.onYearSelected(num)
  }
}

export default Map
