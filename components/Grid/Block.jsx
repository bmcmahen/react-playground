import React, {Component, PropTypes} from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'

require('./Block.css')


/**
 * Determine Transform property to use
 */

const transformProp = function(){
  var styles = [
    'webkitTransform',
    'msTransform',
    'transform'
  ];

  var react = [
    'WebkitTransform',
    'MsTransform',
    'transform'
  ]

  var el = document.createElement('p');
  var style;

  for (var i = 0; i < styles.length; i++) {
    if (null != el.style[styles[i]]) {
      style = react[i];
      break;
    }
  }

  return style
}()

class Block extends Component {

  constructor(props){
    super(props)
    this.state = {
      flipped: false
    }
  }

  static propTypes = {
    item: PropTypes.instanceOf(Immutable.Map),
    selected: PropTypes.bool.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    left: PropTypes.number,
    top: PropTypes.number
  }

  render(){
    let {item, selected, left, top} = this.props
    let classes = classNames({
      'Block': true,
      'flipped': this.state.flipped,
      'selected': selected
    })

    // let style = {
    //   width: this.props.width + 'px',
    //   height: this.props.height + 'px',
    //   [transformProp]: `translateX(${left}px) translateY(${top}px)`
    // }

    // // Uncomment to use abs positioning, which will have better
    // // non-animation performance. If animation is important, use
    // // transform style as above.
    let style = {
      left: left + 'px',
      top: top + 'px',
      width: this.props.width + 'px',
      height: this.props.height + 'px'
    }

    return (
      <li
        className={classes}
        style={style}
        onClick={this.onClick.bind(this)}
      >
          <div>{item.get('title')}</div>
      </li>
    )
  }

  onClick(e){
    this.setState({ flipped: !this.state.flipped })
  }


}

export default Block
