import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'

require('./Container.css')

class Container extends Component {

  displayName = 'Container'

  static proptTypes = {
  }

  constructor(props){
    super(props)
    this.state = {}
  }

  render(){

    const classes = classNames({
      'Container': true
    })

    const main = classNames({
      'Container__main': true,
      'open': this.state.isOpen
    })

    const detail = classNames({
      'Container__detail': true,
      'open': this.state.isOpen
    })

    return (
      <div className={classes}>
        <section className={main}>
          <h1>Main</h1>
          <button onClick={this.showDetail.bind(this)}>
            show detail
          </button>
        </section>
        <section className={detail}>
          <h1>Detail</h1>
          <button onClick={this.hideDetail.bind(this)}>
            hide detail
          </button>
        </section>
      </div>
    )
  }

  showDetail(){
    this.setState({ isOpen: true })
  }

  hideDetail(){
    this.setState({ isOpen: false })
  }
}

export default Container
