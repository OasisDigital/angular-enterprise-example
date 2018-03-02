# Example API server

This is an example API server for this enterprise example project.

Like a real enterprise project, it serves several different APIs used by different parts of an application suite.

Unlike a real (2018) typical enterprise project, it is implemented all in a
single Node server. It is done this way only for development and demo
convenience. Most real systems built today with such widely disparate APIs would
divide them into different code bases, and perhaps even deploy them as micro
services.

## REST

http://localhost:8005/

Using json-server behind the scenes, a rest API is provided.

## SSE

http://localhost:8005/lowfreq

SSE is "server sent events"; you can think of it as like web sockets, but it
works only in the downward direction, it is simpler than web sockets, and it
fits through a greater variety of off-the-shelf HTTP-based infrastructure.
Overall SSE is a very good choice for applications that push data from a server
to connected pages, but otherwise use a more typical HTTP/POST/etc based
approach for client/server communication.

### Fake FX Data

The algorithm used here, to generate somewhat realistic looking fake FX data, is
mostly borrowed from the following excellent book. However the code in that book
for the algorithm was in PHP, so it is re-implemented here in TypeScript.

http://shop.oreilly.com/product/0636920030928.do

## GraphQL

http://localhost:8005/graphql

http://localhost:8005/graphiql

A GraphQL APIs also provided, again with very limited, fake data.

## Running

```
yarn
yarn start
```
