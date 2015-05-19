import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'

require('./Map.css')

class Map extends Component {

  static PropTypes = {
    dateRange: PropTypes.array.isRequired,
    onYearSelected: PropTypes.func.isRequired,
    activeYear: PropTypes.number
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

    let classes = classnames({
      'Map__item': true,
      'Map__item--active': num == this.props.activeYear
    })

    return (
      <li key={num} className={classes}>
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
