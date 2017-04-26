
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

const getPets = (ssn: string) => {
  return Promise.resolve([{name: 'Carmella', kind: 'rabbit'}, {name: 'Smiley', kind: 'hermit crab'}]);
};


const resolvers = {
  Query: {
    posts() {
      return [{ 'name': 'first', popularity: 1 }, {'name': 'second', popularity: 4}];
    },
    employees() {
      return [
        {name: 'billy', ssn: '123-45-6789', pets: () => getPets('') },
        {name: 'bob', ssn: '987-65-4321', pets: () => getPets('')}
      ];
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
