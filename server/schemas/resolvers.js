const { User} = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
    Query: {
      // get all users
      users: async () => {
        return User.find()
            .select('-__v -password')
            .populate('friends')
            // .populate('toughts');
      },      
      // get a user by username
      user: async (parent, { username }) => {
        return User.findOne({ username })
        .select('-__v -password')
        .populate('friends')
        // .populate('thoughts');
      },
      // thoughts: async (parent, { username }) => {
      //     // ternary operator to check if username exists
      //   const params = username ? { username } : {};
      //   return Thought.find(params).sort({ createdAt: -1 });
      // },
      // // we destructure the _id argument value and place it into our .findOne() method to look up a single thought by its _id
      // thought: async (parent, { _id }) => {
      //     return Thought.findOne({ _id });
      // },
      me: async (parent, args, context) => {
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id })
            .select('-__v -password')
            .populate('thoughts')
            .populate('friends');
      
          return userData;
        }
      
        throw new AuthenticationError('Not logged in');
      },

      // checkout: async (parent, args, context) => {
      //   const url = new URL(context.headers.referer).origin;
      //   const order = new Order({ products: args.products });
      //   const { products } =await order.populate('products').execPopulate();
  
      //   const line_items = [];
  
      //   for (let i = 0; i < products.length; i++) {
      //     //generate product id
      //     const product = await stripe.products.create({
      //       name: products[i].name,
      //       description: products[i].description,
      //       images: [`${url}/images/${products[i].image}`]
      //     });
  
      //     // generate price id using product id
      //     const price = await stripe.prices.create({
      //       product: product.id,
      //       unit_amount: products[i].price * 100,
      //       currency: 'usd',
      //     });
  
      //     // add price id to the line items array
      //     line_items.push({
      //       price: price.id,
      //       quantity: 1
      //     });
      //   }
      //   const session = await stripe.checkout.sessions.create({
      //     payment_method_types: ['card'],
      //     line_items,
      //     mode: 'payment',
      //     success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
      //     cancel_url: `${url}/`
      //   });
  
  
      //   return {session: session.id};
      // }
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
        // addThought: async (parent, args, context) => {
        //     if (context.user) {
        //       const thought = await Thought.create({ ...args, username: context.user.username });
          
        //       await User.findByIdAndUpdate(
        //         { _id: context.user._id },
        //         { $push: { thoughts: thought._id } },
        //         { new: true }
        //       );
          
        //       return thought;
        //     }
          
        //     throw new AuthenticationError('You need to be logged in!');
        // },
        // addReaction: async (parent, { thoughtId, reactionBody }, context) => {
        //     if (context.user) {
        //       const updatedThought = await Thought.findOneAndUpdate(
        //         { _id: thoughtId },
        //         { $push: { reactions: { reactionBody, username: context.user.username } } },
        //         { new: true, runValidators: true }
        //       );
          
        //       return updatedThought;
        //     }
          
        //     throw new AuthenticationError('You need to be logged in!');
        // },
        addFriend: async (parent, { friendId }, context) => {
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { friends: friendId } },
                { new: true }
              ).populate('friends');
          
              return updatedUser;
            }
          
            throw new AuthenticationError('You need to be logged in!');
        }
    }
  };
module.exports = resolvers;