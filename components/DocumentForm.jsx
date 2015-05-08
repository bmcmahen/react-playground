import React, {Component} from 'react';
import Formset from './Formset.jsx';

function isRequired(v){
  return !!v;
}

const required = Object.freeze([
  {
    name: 'name',
    type: 'text',
    label: 'First Name *',
    validate: isRequired
  },
  {
    name: 'surname',
    type: 'text',
    label: 'Last Name *',
    validate: isRequired
  }
]);

const person = Object.freeze([
  {
    name: 'email',
    type: 'text',
    label: 'Email Address'
  },
  {
    name: 'tags',
    label: 'Tags',
    type: 'list',
    addButton: true,
    schema : {
      name: 'tag',
      type: 'text'
    }
  }
]);

class DocumentForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      value: props.value || {},
      errors: {}
    };
  }

  determineSchema(){
    let fields = [];
    let fieldByName = {};
    [required, person].forEach(schema => {
      schema.forEach(field => {
        // prevent duplicate fields from being added
        if (fieldByName[field.name]) return;
        fieldByName[field.name] = true;
        fields.push(field);
      });
    });
    return fields;
  }

  render(){

    let schema = this.determineSchema();

    return (
      <div className='DocumentForm'>
        <form onSubmit={this.onSubmit.bind(this)}>
          <Formset
            schema={schema}
            value={this.state.value}
            errors={this.state.errors}
            onChange={this.onChange.bind(this)}
          />
        <button type='submit' onClick={this.onSubmit.bind(this)}>
          Save
        </button>
        </form>
      </div>
    );
  }

  onSubmit(e){
    e.preventDefault();
    // run validation here?
    console.log('save document as %o', this.state.value);
  }

  onChange(val, field){
    console.log('set field %o to val %o', field, val);
    var value = this.state.value;
    value[field] = val;
    this.setState({ value : value });
  }
}

export default DocumentForm;
