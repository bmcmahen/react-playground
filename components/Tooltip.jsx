import React, {Component, PropTypes} from 'react'
import Popover from './Popover.jsx'
import uid from 'uid'

class Tooltip extends Component {

  static propTypes = {
    placement: PropTypes.oneOf(['top', 'bottom']),
    content: PropTypes.node.isRequired
  }

  static defaultProps = {
    placement: 'top'
  }

  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      uid: 'tooltip'+ uid(4)
    }
  }

  getContainer(){
    if (!this._container) {
      this._container = document.createElement('div')
      this._container.className = 'Tip'
      document.body.appendChild(this._container)
    }
    return this._container
  }

  renderTip(fn){
    fn = fn || function(){}
    const node = React.findDOMNode(this)
    const rect = node.getBoundingClientRect()
    const pos = offset(rect)

    let style = {
      left: pos.left + (rect.width / 2) + 'px'
    }

    if (this.props.placement === 'bottom') {
      style.top = pos.top + rect.height + 'px'
    }

    else if (this.props.placement === 'top') {
      style.bottom = window.innerHeight - pos.top + 'px'
    }

    React.render(
      <Popover
        visible={this.state.visible}
        role='tip'
        uid={this.state.uid}
        style={style}
        placement={this.props.placement}
        content={this.props.content}
      />, this.getContainer(), fn)
  }

  removeTip(){
    if (this._container) {
      React.unmountComponentAtNode(this._container)
    }
  }

  render(){
    let child = React.Children.only(this.props.children)

    // todo: eventually support 'click' popovers
    let newProps = {
      onMouseEnter: this.show.bind(this),
      onMouseLeave: this.hide.bind(this)
    }

    if (this.state.visible) {
      newProps['aria-described-by'] = this.state.uid
    }

    return React.cloneElement(child, newProps)
  }

  show(){
    this.setState({ visible: true })
  }

  hide(){
    this.setState({ visible: false })
  }

  componentDidMount(){
    this.componentDidUpdate()
  }

  componentDidUpdate(){
    if (this.state.visible) {
      this.renderTip()
    } else {
      this.removeTip()
    }
  }

  componentWillUnmount(){
    if (this._container) {
      // cleanup the existing mount container
      this._container
        .parentElement
        .removeChild(this._container)
    }
  }
}

function offset (box) {
  var body = document.body;
  var docEl = body.parentNode;
  var clientTop  = docEl.clientTop  || body.clientTop  || 0;
  var clientLeft = docEl.clientLeft || body.clientLeft || 0;
  var scrollTop  = window.pageYOffset || docEl.scrollTop;
  var scrollLeft = window.pageXOffset || docEl.scrollLeft;

  return {
    top: box.top  + scrollTop  - clientTop,
    left: box.left + scrollLeft - clientLeft
  };
}

export default Tooltip
