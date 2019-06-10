import express from 'express';
import { ApolloServer} from 'apollo-server-express';

import schema from './schema';
import resolvers from './resolvers';
import models from './models/index';

const app = express();

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

server.applyMiddleware({ app, path: '/graphql' });

models.sequelize.sync({}).then(() => {
    app.listen({ port: 8000 }, () => {
        console.log('Apollo Server on http://localhost:8000/graphql');
      });
});
