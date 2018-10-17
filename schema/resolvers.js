const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserInputError } = require("apollo-server");

// Validation methods
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

const createToken = (user, secret, expiresIn) => {
  const { username, email, id } = user;
  // Create and return jwt token
  return jwt.sign({ username, email, id }, secret, { expiresIn });
};

exports.resolvers = {
  Query: {
    // Simple queries not currently used in frontend
    getCurrentUser: async (root, args, { currentUser, User }) => {
      if (!currentUser) {
        return null;
      }
      const user = await User.findOne({
        email: currentUser.email
      });
      return user;
    },
    getAllUsers: async (root, args, { User }) => {
      return User.find({});
    }
  },
  Mutation: {
    signinUser: async (root, args, { User }) => {
      // Form validation
      const { errors, isValid } = validateLoginInput(args);
      if (!isValid) {
        throw new UserInputError("Invalid input", errors);
      }

      const { email, password } = args;
      const user = await User.findOne({ email });
      // Throw error if user not found
      if (!user) {
        throw new UserInputError("Invalid input", {
          email: "User not found"
        });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      // Throw error if password incorrect
      if (!isValidPassword) {
        throw new UserInputError("Invalid input", {
          password: "Incorrect password"
        });
      }
      // Return jwt token if success
      return { token: createToken(user, process.env.SECRET, "1hr") };
    },
    signupUser: async (root, args, { User }) => {
      // Form validation
      const { errors, isValid } = validateRegisterInput(args);
      if (!isValid) {
        throw new UserInputError("Invalid input", errors);
      }

      const { username, email, password } = args;
      // Throw error if user already exists
      const user = await User.findOne({ email });
      if (user) {
        throw new UserInputError("Invalid input", {
          email: "User already exists"
        });
      }

      // Create new user and return jwt token
      const newUser = await new User({
        username,
        email,
        password
      }).save();
      return { token: createToken(newUser, process.env.SECRET, "1hr") };
    },
    deleteUser: async (root, { id }, { currentUser, User }) => {
      // Check to make sure currentUser matches id passed to GraphQL
      if (currentUser.id == id) {
        const user = await User.findOneAndDelete({ _id: id });
        return user;
      }
      // Otherwise, return null
      return null;
    }
  }
};
