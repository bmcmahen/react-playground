import React, {Component, PropTypes} from 'react'
import Item from './Item.jsx'
import Year from './Year.jsx'

class Timeline extends Component {

  static propTypes = {
    yearSpan: PropTypes.number,
    activeItem: PropTypes.string,
    content: PropTypes.array.isRequired
  }

  static defaultProps = {
    yearSpan: 10
  }

  static displayName = 'Timeline'

  constructor(props){
    super(props)
    this.state = {}
  }

  render(){

    let content = this.renderContent(this.props.content)

    return (
      <section className='Timeline'>
        <div className='Timeline__line' role='presentation'/>
        <ol className='Timeline__content'>
          {content}
        </ol>
      </section>
    )
  }

  renderContent(items){
    const yearSpan = this.props.yearSpan
    let els = []
    let startDate = this.state.dateRange[0]

    /**
     * Insert a 'year' label into our stack
     * @param {Number} year
     */

    function insertLabel(year) {
      startDate = year + yearSpan
      els.push(
        <YearLabel year={year} />
      )
    }

    for (let item of items) {

      // insert our 'year' label if need be
      let year = nearestTenDown(item._year)
      if (year >= startDate) {
        for (let y = startDate; y < (year + yearSpan); y += yearSpan) {
          insertLabel(y)
        }
      }

      els.push(
        <Item
          content={item}
          onSelect={this.selectItem}
        />
      )
    }
  }

  selectItem(item){

  }

}

function nearestTenUp(num){
  return Math.ceil(num / 10) * 10;
}

function nearestTenDown(num){
  return Math.floor(num / 10) * 10;
}

export default Timeline
