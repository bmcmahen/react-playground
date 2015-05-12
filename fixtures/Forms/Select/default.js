function logChange(val){
  console.log(val);
}

module.exports = {
  name: 'documentType',
  multi: false,
  onChange: logChange,
  placeholder: 'Document Type',
  options: [
    { value: 'place', label: 'Place' },
    { value: 'person', label: 'Person' }
  ]
};
