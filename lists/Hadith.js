const { Text, Relationship } = require('@keystonejs/fields');

module.exports = {
  labelField: 'textAr',
  fields: {
    textAr: { 
      type: Text,
      isUnique: true,
      isRequired: true,
    },
    textEn: { type: Text },
    textFr: { type: Text },
    isnadAr: { type: Text },
    comment: { type: Relationship, ref: 'Comment.hadith', many: true },
  },
  adminConfig: {
    defaultPageSize: 20,
  },
};