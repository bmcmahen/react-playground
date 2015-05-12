import React, {Component} from 'react';
import Formset from './Formset.jsx';
import Input from './Field.jsx';
import Select from './Select.jsx';
import List from './List.jsx';

function isRequired(v){
  return !!v;
}

const required = Object.freeze([
  {
    name: 'name',
    widget: Input,
    label: 'First Name *',
    validate: isRequired
  },
  {
    name: 'surname',
    widget: Input,
    label: 'Last Name *',
    validate: isRequired
  },
  {
    name: 'type',
    widget: Select,
    options: [
      { value: 'place', label: 'Place' },
      { value: 'person', label: 'Person' }
    ]
  }
]);

const person = Object.freeze([
  {
    name: 'email',
    widget: Input,
    label: 'Email Address'
  },
  {
    name: 'tags',
    label: 'Tags',
    widget: List,
    addButton: true,
    schema : {
      name: 'tag',
      widget: Input
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
