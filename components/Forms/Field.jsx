var React = require('react');
var {PropTypes} = React;

var Field = React.createClass({

  propTypes: {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.string.isRequired,
    type: PropTypes.string,
    onRemove: PropTypes.func,
    index: PropTypes.number,
    onChange: PropTypes.func.isRequired
  },

  getDefaultProps: function(){
    return {
      value: ''
    }
  },

  render: function(){
    return (
      <div className='Field'>
        {this.props.label &&
          <label>{this.props.label}</label>
        }
        {this.props.error && <div className='error'>{this.props.error}</div>}
        <input type='text' value={this.props.value} onChange={this.onChange} />
        {this.props.onRemove &&
          <button onClick={this.props.onRemove}>Remove</button>
        }
      </div>
    );
  },

  onChange: function(e){
    var val = e.target.value;
    this.props.onChange(val, this.props.name );
  }
});

module.exports = Field;
