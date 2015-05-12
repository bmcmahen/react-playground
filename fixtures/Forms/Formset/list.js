module.exports = {
  schema: [
    { name: 'name', type: 'text', label: 'First Name' },
    { name: 'surname', type: 'text', label: 'Last Name' },
    {
      name: 'tags',
      type: 'list',
      label: 'Tags',
      addButton: true,
      schema:
        { name: 'tag',  type: 'text' }
    }
  ],
  value: {
    name: 'ben',
    surname: 'mcmahen',
    tags: ['author']
  }
};
