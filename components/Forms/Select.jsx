import React, {PropTypes} from 'react';
import SelectBox from 'react-select';

require('./styles/Select.css');

var Select = React.createClass({

  propTypes: {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    multi: PropTypes.bool,
    placeholder: PropTypes.string,
    options: PropTypes.array.isRequired
  },

  render(){
    return (
      <div className='Select'>
        <SelectBox
          name={this.props.name}
          value={this.props.value}
          options={this.props.options}
          onChange={this.onChange}
        />
      </div>
    );
  },

  onChange(val){
    console.log('select menu changed', val, this.props.name);
    this.props.onChange(val, this.props.name);
  }
});

export default Select;
