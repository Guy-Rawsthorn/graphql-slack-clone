import express from "express";
import { ApolloServer } from "apollo-server-express";
import models from "./models/index";
import path from "path";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";
require("dotenv").config();
import jwt from 'jsonwebtoken';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, "./schemas")));

const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, "./resolvers"))
);

const SECRET = process.env.PRIVATE_KEY;
const SECRET2 = process.env.PRIVATE_KEY2;

const app = express();

const findUser = (req) => {
  const token = req.headers.authorization || "";
  if (token) {
    try {
    const {user} = jwt.verify(token, SECRET)
    console.log("user Id - ",user)
    return user
    }
    catch (err){
      console.log(err)
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    
    // add the user to the context
    return {
      user: findUser(req),
      models,
      SECRET,
      SECRET2
    };
  }
});

server.applyMiddleware({ app, path: "/graphql" });

models.sequelize.sync({}).then(() => {
  app.listen({ port: 8000 }, () => {
    console.log("Apollo Server on http://localhost:8000/graphql");
  });
});
