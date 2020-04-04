const { Text } = require('@keystonejs/fields');

module.exports = {
  labelField: 'shortName',
  fields: {
    shortName: { 
      type: Text,
      isUnique: true,
      isRequired: true,
    },
    longName: { type: Text },
  },
  adminConfig: {
    defaultPageSize: 50,
  },
};