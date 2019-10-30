const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { Text, Checkbox, Password, Relationship } = require('@keystonejs/fields');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');

const PROJECT_NAME = "My Hadith";


const keystone = new Keystone({
  name: PROJECT_NAME,
  adapter: new Adapter(),
});

// Access control functions
const userIsAdmin = ({ authentication: { item: user } }) => Boolean(user && user.isAdmin);
const userOwnsItem = ({ authentication: { item: user } }) => {
  if (!user) {
    return false;
  }
  return { id: user.id };
};
const userIsAdminOrOwner = auth => {
  const isAdmin = access.userIsAdmin(auth);
  const isOwner = access.userOwnsItem(auth);
  return isAdmin ? isAdmin : isOwner;
};
const access = { userIsAdmin, userOwnsItem, userIsAdminOrOwner };

keystone.createList('User', {
  fields: {
    name: { type: Text },
    email: {
      type: Text,
      isUnique: true,
    },
    isAdmin: { type: Checkbox },
    password: {
      type: Password,
    },
  },
  // To create an initial user you can temporarily remove access controls
  access: {
    read: access.userIsAdminOrOwner,
    update: access.userIsAdminOrOwner,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
    auth: true,
  },
});

keystone.createList('Author', {
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
});

keystone.createList('Hadith', {
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
    comment: { type: Relationship, ref: 'Comment', many: true },
  },
  adminConfig: {
    defaultPageSize: 20,
  },
});

keystone.createList('Comment', {
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
});

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    // To create an initial user you can temporarily remove the authStrategy below
    new AdminUIApp({ enableDefaultRoute: true, authStrategy }),
  ],
};
