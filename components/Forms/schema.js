var schema = Object.freeze({

  // required fields
  required: [
    {
      name: 'name',
      type: 'text',
      label: 'First Name'
    },
    {
      name: 'surname',
      type: 'text',
      label: 'Last Name'
    }
  ],

  // person required fields
  person: [
    {
      name: 'email',
      type: 'text',
      label: 'Email Address'
    }
  ]

});

module.exports = schema;
