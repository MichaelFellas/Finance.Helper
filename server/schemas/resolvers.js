const { AuthenticationError } = require("apollo-server-express");
const { GraphQLScalarType, Kind } = require("graphql");

const { User, Bill, Goal, Contribution } = require("../models");
const { signToken } = require("../utils/auth");

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});

const resolvers = {
  Date: dateScalar,
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id }).populate(
          "Goals"
        );

        return user;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    goal: async (parent, { goalId }, context) => {
      if (context.user) {
        const goal = await User.findOne({
          _id: context.user._id,
        }).populate("Goals", {
          match: { Goals: { _id: goalId } },
        });
        console.log(goal);
        return goal;
      }
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
      console.log(args, "Hello");
      try {
        const goal = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: { Goals: args },
          },
          {
            new: true,
            runValidators: true,
          }
        );

        return goal;
      } catch (err) {
        console.log(err);
      }
    },

    removeGoal: async (parent, args, context) => {
      try {
        const user = User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { Goals: { _id: args._id } } },
          { new: true }
        );

        return user;
      } catch (err) {
        console.log(err);
      }
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
