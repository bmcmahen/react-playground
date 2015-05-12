var React = require('react');

var Formset = React.createClass({

  propTypes: {
    schema: React.PropTypes.array.isRequired,
    errors: React.PropTypes.object,
    value: React.PropTypes.object,
    onChange: React.PropTypes.func.isRequired
  },

  getDefaultProps: function(){
    return {
      value: {},
      errors: {}
    }
  },

  render: function(){
    var {schema, value} = this.props;
    var inputs = schema.map(this.renderField);

    return (
      <div className='Formset'>
        {inputs}
      </div>
    );
  },

  renderField: function(field){
    var {name, schema, label, ...other} = field;
    var Widget = field.widget;

    return (
      <Widget
        name={name}
        key={name}
        error={this.props.errors[field.name]}
        schema={schema}
        label={label}
        value={this.props.value[field.name]}
        onChange={this.onChange}
        {...other}
      />
    );

  },

  onChange: function(val, field){
    this.props.onChange(val, field);
  }

});

module.exports = Formset;
