const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      // get all users
      users: async () => {
        return User.find()
            .select('-__v -password')
            .populate('friends')
            .populate('toughts');
      },      
      // get a user by username
      user: async (parent, { username }) => {
        return User.findOne({ username })
        .select('-__v -password')
        .populate('friends')
        .populate('thoughts');
      },
      
      me: async (parent, args, context) => {
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id })
            .select('-__v -password')
            // .populate('thoughts')
            // .populate('friends');
      
          return userData;
        }
      
        throw new AuthenticationError('Not logged in');
      }
    }, 
    Mutation: {
        // the mongoose model created a new user in the db with whatever is passed in as the args
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrent credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };

        },
        
        
    }
  };
module.exports = resolvers;