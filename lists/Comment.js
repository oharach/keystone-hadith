const { Text, Relationship } = require('@keystonejs/fields');

module.exports = {
  labelField: 'textAr',
  fields: {
    textAr: { 
      type: Text,
      isRequired: true,
    },
    textEn: { type: Text },
    textFr: { type: Text },
    author: { type: Relationship, ref: 'Author', isRequired: true },
    hadith: { type: Relationship, ref: 'Hadith.comment', isRequired: true },
  },
  adminConfig: {
    defaultPageSize: 50,
  },
};