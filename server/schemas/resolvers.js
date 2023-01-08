// import user model
const { User } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');
// auth error 
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
      // By adding context to our query, we can retrieve the logged in user without specifically searching for them
        me: async (parent, args, context) => {
        if (context.user) {
            return User.findOne({ _id: context.user._id }).select (
                "-__v -password"
            );
            return userData;
        }
        throw new AuthenticationError('You need to be logged in!');
        },
    },

    Mutation: {
        login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
        if (!user) {
            throw new AuthenticationError('Hm, something is not right. Please try again.');
        }
        const correctPW = await user.isCorrectPassword(password);
        if (!correctPW) {
            throw new AuthenticationError('Hm, something is not right. Please try again.');
        }
        const token = signToken(user);
        return { token, user };
        },

        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return {token, user};
        },

      // Add a third argument to the resolver to access data in our `context`
        saveBook: async (parent, {}, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$addToSet: {savedBooks: input}},
                    { new: true, runValidators: true}
                );
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in to do that!')
        },
        removeBook: async (parent, {}, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: { savedBooks: {bookId: bookId}} },
                    { new: true}
                );
                return updatedUser;
            }
        throw new AuthenticationError('You need to be logged in to do that!');
        },
    },
};

module.exports = resolvers;