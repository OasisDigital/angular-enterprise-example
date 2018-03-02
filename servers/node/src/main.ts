import { addSSE } from './sse/sse';
import { addGraphQL } from './graphql/graphql';
import { addREST } from './rest/rest';
import * as express from 'express';

const server = express().set('json spaces', 2);

addSSE(server);
addGraphQL(server);
addREST(server);

const port = process.env.PORT || 8005;
server.listen(port, () => {
  console.log('JSON Server listening on http://localhost:%s/', port);
});
