import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'

require('./Item.css')

class Item extends Component {

  static PropTypes = {
    date: PropTypes.string.isRequired,
    title: PropTypes.string,
    image: PropTypes.string,
    type: PropTypes.oneOf(['text', 'image']),
    visible: PropTypes.bool.isRequired
  }

  constructor(props){
    super(props)
  }

  render(){

    const classes = classNames({
      'Timeline__item': true,
      'Timeline__item--image': this.props.image,
      'masonry-item': this.props.visible
    })

    return (
      <li className={classes} aria-hidden={this.props.visible}>
        <div className='Timeline__item-container'>
          <div>
            {this.props.image && <img src={this.props.image} />}
            <div>
              <span className='Item__date'>
                {this.props.date}
              </span>
              <span className='Item__title'>
                {this.props.title}
              </span>
            </div>
            <div className='Timeline__connector'>
              <div className='Timeline__circle'/>
            </div>
          </div>
        </div>
      </li>
    )
  }
}

export default Item
