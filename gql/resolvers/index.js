const { merge } = require('lodash');

const Hello = require('./hello');
const Users = require('./users');
const Posts = require('./posts');


module.exports = merge(Hello, Users, Posts);
