import { lowfreqChannel, highfreqChannel } from './channels';
const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const PORT = process.env.PORT || 8005;

server.use(middlewares);

server.get('/lowfreq', function (req, res) {
  lowfreqChannel.addClient(req, res);
});

server.get('/highfreq', function (req, res) {
  highfreqChannel.addClient(req, res);
});

server.use(jsonServer.bodyParser);

server.use(router);

server.listen(PORT, () => {
  console.log('JSON Server listening on http://localhost:%s/', PORT);
});
