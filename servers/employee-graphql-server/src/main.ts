
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';

const PORT = 3000;

const app = express();

const typeDefs = `
type Post {
  name: String!
  popularity: Int
}

type Pet {
  kind: String!
  name: String!
}

type Employee {
  name: String!
  ssn: String
  pets: [Pet]
}

type Query {
  posts: [Post]
  employees: [Employee]
}

schema {
  query: Query
}
`;

const resolvers = {
  Query: {
    posts() {
      return [{ 'name': 'first', popularity: 1 }];
    },
    employees() {
      return [];
    }
  }
};

const jsSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

app.use('/graphql', bodyParser.json(),
  graphqlExpress({
    schema: jsSchema
  }));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

app.listen(PORT);
