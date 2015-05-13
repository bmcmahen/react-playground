import React, {Component, PropTypes} from 'react'

class Item extends Component {

  static PropTypes = {
    date: PropTypes.string.isRequired,
    title: PropTypes.string,
    image: PropTypes.string,
    type: PropTypes.oneOf(['text', 'image'])
  }

  constructor(props){
    super(props)
  }

  render(){
    return (
      <div className='Item'>
        <p>
          <span className='Item__date'>
            {this.props.date}
          </span>
          <span className='Item__title'>
            {this.props.title}
          </span>
        </p>
      </div>
    )
  }
}

export default Item
