import React, {Component, PropTypes} from 'react'
import Grid from './Grid.jsx'
import Block from './Block.jsx'
import Immutable from 'immutable'
import shouldPureComponentUpdate from 'react-pure-render/function'
import debounce from 'lodash.debounce'

class GridController extends Component {

  shouldComponentUpdate = shouldPureComponentUpdate

  constructor(props){
    super(props)
    this._items = Immutable.fromJS(props.items)
    this.state = {
      items: this._items,
      selected: null,
      containerWidth: 800,
      query: ''
    }
    this.filter = debounce(this.filter, 400)
  }

  render(){
    return (
      <div className='GridController'>
        <div className='GridController__controls'>
          <input type='text' onChange={this.onFilter.bind(this)} value={this.state.query} placeholder='Filter'/>
        </div>
        <Grid
          layoutType='dynamic'
          itemWidth={100}
          itemHeight={100}
          paddingWidth={20}
          paddingHeight={20}
          containerWidth={this.state.containerWidth}>
            {this.state.items.map(this.renderBlock.bind(this))}
        </Grid>
      </div>
    )
  }

  onFilter(e){
    let text = e.target.value
    this.setState({ query : text })
    this.filter(text)
  }

  filter(text){
    if (!text.length) {
      this.setState({ items: this._items })
      return
    }

    const filtered = this._items.filter(v => {
      return v.get('title').indexOf(text) > -1
    })
    this.setState({ items: filtered })
  }

  renderBlock(item){
    let selected = item.get('_id') === this.state.selected
    return (
      <Block
        key={item.get('_id')}
        item={item}
        selected={selected}
        onSelect={this.selectBlock.bind(this, item)}
      />
    )
  }

  selectBlock(item){
    this.setState({ selected: item.get('_id') })
  }
}

export default GridController
