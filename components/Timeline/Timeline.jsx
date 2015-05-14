import React, {Component, PropTypes} from 'react'
import Item from './Item.jsx'
import YearLabel from './Year.jsx'
import Masonry from 'masonry-layout'
import imagesLoaded from 'imagesloaded'
import classNames from 'classnames'
import Immutable from 'immutable'

require('./Timeline.css')

class Timeline extends Component {

  static propTypes = {
    yearSpan: PropTypes.number,
    activeItem: PropTypes.string,
    content: PropTypes.instanceOf(Immutable.List).isRequired,
    onItemSelected: PropTypes.func
  }

  static defaultProps = {
    yearSpan: 10
  }

  static displayName = 'Timeline'

  constructor(props){
    super(props)
    let dateRange = getDateRange(props.content, props.yearSpan)
    this.state = {
      dateRange: dateRange,
      layoutComplete: false
    }
  }

  componentDidMount(){
    // run masonry on our rendered layout
    const container = React.findDOMNode(this.refs.container)
    const width = container.clientWidth
    this.masonry = new Masonry(container, {
      itemSelector: '.masonry-item',
      columnWidth: width / 2,
      isInitLayout: false,
      transitionDuration: 0
    })

    this.masonry.on('layoutComplete', () => {
      // inefficent. consider changing
      for (let item of this.masonry.items) {
        if (item.position.x === 0) {
          item.element.classList.add('Timeline__item--showing-left')
        } else {
          item.element.classList.remove('Timeline__item--showing-left')
        }
      }
      this.setState({ layoutComplete: true })
    })

    imagesLoaded(container, () => {
      this.masonry.layout()
    })
  }

  componentDidUpdate(prevProps){
    if (prevProps.content !== this.props.content) {
      this.masonry.reloadItems()
      this.masonry.layout()
    }
  }

  componentWillUnmount(){
    if (this.masonry){
      this.masonry.destroy()
    }
  }

  render(){

    let content = this.renderContent(this.props.content)
    let classes = classNames({
      'Timeline': true,
      'Timeline--loading': !this.state.layoutComplete
    })

    return (
      <section className={classes}>
        <div className='Timeline__line' role='presentation'/>
        <ol className='Timeline__content' ref='container'>
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
        <YearLabel year={year} key={year} />
      )
    }

    items.forEach(item => {

      // insert our 'year' label if need be
      let year = nearestDown(getYear(item), this.props.yearSpan)
      if (year >= startDate) {
        for (let y = startDate; y < (year + yearSpan); y += yearSpan) {
          insertLabel(y)
        }
      }

      els.push(
        <Item
          key={item.get('_id')}
          date={item.get('date')}
          image={item.get('image')}
          visible={item.get('visible')}
          title={item.get('title')}
          onSelect={this.selectItem}
        />
      )

    })

    return els
  }

  selectItem(item){
    if (this.props.onItemSelected) {
      this.props.onItemSelected(item)
    }
  }

}

function nearestTenUp(num, range){
  return Math.ceil(num / range) * range;
}

function nearestDown(num, range){
  return Math.floor(num / range) * range;
}

function getYear(doc){
  return new Date(doc.get('date')).getFullYear()
}

function getDateRange(docs, range){
  const first = nearestDown(getYear(docs.first()), range)
  const last = nearestTenUp(getYear(docs.last()), range)
  let dateRange = []
  for (let i = first; i <= last + 10; i += 10) {
    dateRange.push(i)
  }
  return dateRange
}

function parseDates(docs){
  let dates = {}
  for (let doc of docs) {
    dates[doc.get('_id')] = {
      date: new Date(doc.get('date')),
      year: this.date.getFullYear()
    }
    return dates
  }
}


export default Timeline
