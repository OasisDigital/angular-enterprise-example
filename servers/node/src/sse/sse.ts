import { lowfreqChannel, highfreqChannel } from './channels';

export function addSSE(server) {

  server.get('/lowfreq', function (req, res) {
    lowfreqChannel.addClient(req, res);
  });

  server.get('/highfreq', function (req, res) {
    highfreqChannel.addClient(req, res);
  });
}
