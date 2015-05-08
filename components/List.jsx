var React = require('react');
var Field = require('./Field');

var List = React.createClass({

  propTypes: {
    schema: React.PropTypes.object.isRequired,
    value: React.PropTypes.array.isRequired,
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string,
    error: React.PropTypes.string,
    addButton: React.PropTypes.bool,
    onChange: React.PropTypes.func.isRequired
  },

  render: function(){
    var {value, name, label, error} = this.props;

    var els = value.length ? value.map(this.renderSet) : null;

    return (
      <div className='List'>
        {this.props.label &&
          <div className='label'>{this.props.label}</div>
        }
        {error && <div className='error'>{error}</div>}
        {els}
        {this.props.addButton &&
          <button onClick={this.addAnother}>
            Add {label || name}
          </button>
        }
      </div>
    )
  },

  renderSet: function(val, i) {
    var {type, name} = this.props.schema;
    return (
      <Field
        type={type}
        name={name}
        onRemove={this.onRemove.bind(this, val, i)}
        index={i}
        key={i + name}
        onChange={this.onChange.bind(this, val, i)}
        value={val}
      />
    );
  },

  onRemove: function(val, i){
    var val = this.props.value;
    val.splice(i, 1);
    this.props.onChange(val, this.props.name);
  },

  onChange: function(prevVal, i, newVal){
    var val = this.props.value;
    val[i] = newVal;
    this.props.onChange(val, this.props.name);
  },

  addAnother: function(e){
    e.preventDefault();
    var val = this.props.value;
    val.push('');
    this.props.onChange(val, this.props.name);
  }

});

module.exports = List;
