// This is a very basic GraphQL server, serving only a few bits of static data;
// its purpose is to demonstrate how a complex enterprise project will typically
// have various different data services, even serving different protocols.

import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import * as bodyParser from 'body-parser';

const schema = `
type Project {
  id: Int!
  kind: String!
  name: String!
  employees: [Employee]
}

type Employee {
  id: Int!
  name: String!
  ssn: String
  projects: [Project]
}

type Query {
  projects: [Project]
  project(id: Int!): Project
  employees: [Employee]
  employee(id: Int!): Employee
}

schema {
  query: Query
}
`;

class Project {

}

const allProjects = [
  { id: 200, name: 'Covfefe' },
  { id: 201, name: 'Bark' },
  { id: 202, name: 'Woof' },
  { id: 203, name: 'Meow' },
  { id: 204, name: 'Dumpster Fire' },
  { id: 205, name: 'Nova Scotia' }
];

const employeeProjects = [
  { emp: 100, proj: 200 },
  { emp: 100, proj: 201 },
  { emp: 102, proj: 202 },
  { emp: 102, proj: 203 },
];

class Employee {
  constructor(
    public id: number,
    public name: string) { }

  projects(): Promise<Project[]> {
    console.log('calculating projects for emp ', this.id);
    return Promise.resolve(
      employeeProjects
        .filter(ep => ep.emp === this.id)
        .map(ep => ep.proj)
        .map(projId => allProjects.find(proj => proj.id === projId))
    );
  }
}

const employees = [
  new Employee(100, 'Adam'),
  new Employee(101, 'Betty'),
  new Employee(102, 'Chris'),
  new Employee(103, 'David')
];

const resolvers = {
  Query: {
    employees(_obj, _params, _context): Promise<Employee[]> {
      return Promise.resolve(employees);
    },

    employee(_obj, { id }: { id: number }, _context): Promise<Employee> {
      return Promise.resolve(employees.find(p => p.id === id));
    },

    projects() {
      return allProjects;
    },

    project(_obj, { id }: { id: number }, _context): Promise<Project> {
      return Promise.resolve(allProjects.find(p => p.id === id));
    }
  }
};

const jsSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers
});

export function addGraphQL(server) {
  server.use('/graphql', bodyParser.json(),
    graphqlExpress({
      schema: jsSchema
    }));

  server.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
  }));
}

