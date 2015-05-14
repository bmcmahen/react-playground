import React, {PropTypes, Component} from 'react'
import Timeline from './Timeline.jsx'
import Immutable from 'immutable'
import shouldPureComponentUpdate from 'react-pure-render/function'

class TimelineController extends Component {

  shouldComponentUpdate = shouldPureComponentUpdate

  static propTypes = {
    content: PropTypes.array.isRequired
  }

  constructor(props){
    super(props)
    let content = this.processContent(props.content)
    this.state = {
      content: content
    }
    this.onItemSelected = this.onItemSelected.bind(this)
    this.onFilter = this.onFilter.bind(this)
  }

  processContent(items){
    // todo: sort this by date, too
    let list = Immutable.fromJS(items)
    return this.setAllVisible(list)
  }

  setAllVisible(list){
    return list.map(v => {
      return v.set('visible', true)
    })
  }

  render(){

    // if we are filtering data, pass that down instead
    let content = this.state.content

    return(
      <div className='TimelineController'>
        <input type='text' value={this.state.query} onChange={this.onFilter} />
        <Timeline
          yearSpan={5}
          activeItem={this.state.activeItem}
          content={content}
          onItemSelected={this.onItemSelected}
        />
      </div>
    );
  }

  filterContent(field, keyword){
    let list = this.state.content
    return list.map(v => {
      let visible = v.get(field).indexOf(keyword) > -1
      return v.set('visible', visible)
    })
  }

  onFilter(e){
    let val = e.target.value
    let filtered = val
      ? this.filterContent('title', val)
      : this.setAllVisible(this.state.content)
    this.setState({ content: filtered, query: val })
  }

  onItemSelected(item){
    this.setState({ activeItem: item })
  }
}

export default TimelineController
