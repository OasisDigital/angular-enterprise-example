// There are no typings for SseChannel yet, this is the way to use it in untyped
// manner from TypeScript.

// tslint:disable-next-line
const SseChannel = require('sse-channel');

import { startFxGenerator } from './fx';

export const lowfreqChannel = new SseChannel({
    historySize: 100,
    cors: { origins: ['*'] },
    jsonEncode: true
});

export const highfreqChannel = new SseChannel({
    historySize: 100,
    cors: { origins: ['*'] },
    jsonEncode: true
});

// The low-frequency general will generate updates at a pace we could watch in
// the console log without much difficulty.
startFxGenerator(data => lowfreqChannel.send({ data }), 500);

// The high-frequency channel will generate updates quite quickly, so that we can
// experiment with screen update performance.
startFxGenerator(data => highfreqChannel.send({ data }), 10);
