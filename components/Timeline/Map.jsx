import React, {Component, PropTypes} from 'react'

require('./Map.css')

class Map extends Component {

  static PropTypes = {
    dateRange: PropTypes.array.isRequired,
    onYearSelected: PropTypes.func.isRequired
  }

  constructor(props){
    super(props)
    this.renderDate = this.renderDate.bind(this)
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
        <a onClick={this.selectYear.bind(this, num)} href='#'>
          {num}
        </a>
      </li>
    );
  }

  selectYear(num, e){
    e.preventDefault()
    this.props.onYearSelected(num)
  }
}

export default Map
