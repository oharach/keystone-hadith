const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { Text, Relationship } = require('@keystonejs/fields');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');
const UserSchema = require('./lists/User.js');
const AuthorSchema = require('./lists/Author.js');
const HadithSchema = require('./lists/Hadith.js');
const CommentSchema = require('./lists/Comment.js');

const PROJECT_NAME = "My Hadith";

const keystone = new Keystone({
  name: PROJECT_NAME,
  adapter: new Adapter(),
});

keystone.createList('User', UserSchema);
keystone.createList('Author', AuthorSchema);
keystone.createList('Hadith', HadithSchema);
keystone.createList('Comment', CommentSchema);

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
