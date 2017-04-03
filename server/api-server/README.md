# Example API + SSE server

## API

This project:

* Server a RESTful API, using json-server
* Provides a data stream of random but vaguely realistic looking foreign
  exchange (the "FX") data, and feeds it to connected clients using SSE.

## SSE

SSE is "server sent events"; you can think of it as like web sockets, but it
works only in the downward direction, it is simpler than web sockets, and it
fits through a greater variety of off-the-shelf HTTP-based infrastructure.
Overall SSE is a very good choice for applications that push data from a server
to connected pages, but otherwise use a more typical HTTP/POST/etc based
approach for client/server communication.

## Fake FX Data

The algorithm used here, to generate somewhat realistic looking fake FX data, is
mostly borrowed from the following excellent book. However the code in that book
for the algorithm was in PHP, so it is re-implemented here in TypeScript.

<http://shop.oreilly.com/product/0636920030928.do>

## Running

```
yarn
yarn start
```

To see the SSE dataflow in action at the command line:

```
curl http://localhost:8005/lowfreq
curl http://localhost:8005/highfreq
```

More typically, this server should be executed to serve a client UI application.
