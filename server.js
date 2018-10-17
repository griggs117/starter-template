const mongoose = require("mongoose"),
  express = require("express"),
  jwt = require("jsonwebtoken"),
  { ApolloServer } = require("apollo-server-express"),
  path = require("path");
require("dotenv").config({ path: "variables.env" });

const { typeDefs } = require("./schema/schema");
const { resolvers } = require("./schema/resolvers");
const User = require("./models/User");

// Mongoose Configuration
const db = process.env.MONGO_URI;
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ApolloServer initialization
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // Set context for resolvers to use
  context: async ({ req }) => {
    // Add mongoose models to the context
    const contextValues = { User };
    const token = req.headers.authorization || "";
    if (token && token !== "null") {
      try {
        const currentUser = await jwt.verify(token, process.env.SECRET);
        // Add currentUser to context
        return { ...contextValues, currentUser };
      } catch (err) {
        console.error(err);
      }
    }
    return contextValues;
  }
});

// Initialize express server and apply Apollo middleware
const app = express();
server.applyMiddleware({ app });

// Server status assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 4000;

app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);

// app.listen(port, () => console.log(`Server running on port ${port}`));
