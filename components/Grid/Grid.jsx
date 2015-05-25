import React, {Component, PropTypes} from 'react'
import Immutable from 'immutable'

require('./Grid.css')

class Grid extends Component {

  static propTypes = {
    layoutType: PropTypes.oneOf(['justify', 'center', 'dynamic', 'list']),
    containerWidth: PropTypes.number.isRequired,
    itemWidth: PropTypes.number,
    itemHeight: PropTypes.number,
    paddingWidth: PropTypes.number,
    paddingHeight: PropTypes.number
  }

  static defaultProps = {
    items: [],
    layoutType: 'dynamic',
    itemWidth: 50,
    itemHeight: 50,
    paddingWidth: 10,
    paddingHeight: 10
  }

  constructor(props){
    super(props)
    this.state = {
      height: null
    }
  }

  render(){
    let {els, height} = this.renderDynamic()
    let style = { height: height + 'px' }

    return (
      <div className='Grid' style={style}>
        {els}
      </div>
    )
  }

  renderDynamic(){
    const props = this.props
    const Block = props.block
    const cw = props.containerWidth
    const w = props.itemWidth
    const h = props.itemHeight
    const pw = props.paddingWidth
    const ph = props.paddingHeight
    const bpr = Math.floor(cw / ( w + pw )) // boxes per row
    const newWidth = (cw - (bpr * pw)) / bpr // new item width
    const newHeight = (newWidth / w) * h // new item height
    const mx = (cw - (bpr * newWidth) - (bpr - 1) * pw) * 0.5; // spacing

    let els = React.Children.map(this.props.children, (child, i) => {
      const r = Math.floor(i / bpr)
      const c = i % bpr
      const left = mx + (c * (newWidth + pw))
      const top = (r * newHeight) + (r + 1) + (ph * r)
      return React.cloneElement(child, {
        width: newWidth,
        left: left,
        top: top,
        height: newHeight
      })
    })

    const t = React.Children.count(this.props.children)
    const totalHeight = Math.ceil(t / bpr) * (newHeight + ph) + ph
    return {
      els: els,
      height: totalHeight
    }
  }
}


export default Grid
