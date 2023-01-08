// import user model
const { User } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');
// auth error 
const { AuthenticationError } = require('apollo-server-express');
