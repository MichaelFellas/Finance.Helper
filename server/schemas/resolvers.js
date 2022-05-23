const { AuthenticationError } = require("apollo-server-express");
const { User, Bill, Goal, Contribution } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    //WORKS FINE WITH AUTH
    addUser: async (parent, { name, email, password }) => {
      const user = await User.create({ name, email, password });
      console.log(user);
      const token = signToken(user);

      return { token, user };
    },

    //WORKS FINE WITH AUTH
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user with this email found!");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(user);
      return { token, user };
    },

    //TODO: ASK LUCA ABOUT THIS
    addGoal: async (parent, args, context) => {
      const goal = await Goal.create(args);
      const user = await User.findOneAndUpdate(
        { _id: context.user._id },
        {
          $addToSet: { Goals: goal },
        },
        {
          new: true,
          runValidators: true,
        }
      );
      const token = signToken(user);
      return { token, user };
    },

    //TODO: ASK LUCA ABOUT THIS
    addContribution: async (parent, args, context) => {
      const contribution = await Contribution.create(args);
      const goal = await Goal.findOneAndUpdate(
        { _id: context.goal._id }, //HOW TO DO THIS
        {
          $addToSet: { Contributions: contribution },
        },
        {
          new: true,
          runValidators: true,
        }
      );
      const token = signToken(user);
      return { token, goal, contribution };
    },

    //TODO: ASK LUCA ABOUT THIS
    addBill: async (parent, args, context) => {
      const bill = await Bill.create(args);
      const user = await User.findOneAndUpdate(
        { _id: context.user._id },
        {
          $addToSet: { Bills: bill },
        },
        {
          new: true,
          runValidators: true,
        }
      );
      const token = signToken(user);
      return { token, bill, user };
    },
  },
};

module.exports = resolvers;
