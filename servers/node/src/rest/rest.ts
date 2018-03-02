const jsonServer = require('json-server');
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

export function addREST(server) {
  server.use(middlewares);
  server.use(jsonServer.bodyParser);
  server.use(router);
}
