var React = require('react');
var Field = require('./Field.jsx');
var List = require('./List.jsx');

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
    var {name, type} = field;
    if (type === 'list') {
      if (!field.schema) {
        throw new Error('A list field must have a schema');
      }

      return (
        <List
          key={name}
          name={name}
          error={this.props.errors[field.name]}
          schema={field.schema}
          addButton={field.addButton}
          label={field.label}
          value={this.props.value[field.name] || []}
          onChange={this.onChange}
        />
      )
    }

    return (
      <Field
        type={type}
        name={name}
        label={field.label}
        placeholder={field.placeholder}
        error={this.props.errors[name]}
        key={name}
        onChange={this.onChange}
        value={this.props.value[name] || ''}
      />
    );
  },

  onChange: function(val, field){
    this.props.onChange(val, field);
  }

});

module.exports = Formset;
