# Angular Enterprise Example

[![Build Status](https://travis-ci.org/OasisDigital/scalable-enterprise-angular.svg?branch=master)](https://travis-ci.org/OasisDigital/scalable-enterprise-angular)

This is a work in progress. It is likely to have many changes over time,
particularly as all of the tools improve.

## Goals

1. Show an example of a sprawling set of related Angular applications, divided
   into various libraries.
2. Manage complexity, size, and scale.
3. Provide a way to "bloat up" with numerous randomly generated additional
   modules/features/components, up to the size of the largest Angular
   applications.
4. Initially use Angular CLI and Nx.
5. Later, Bazel.

## Technologies used

* Angular 5
* Angular CLI
* Nx
* NgRx/Store, Store addons
* RxJS
* Lodash, Moment
* REST
* SSE
* GraphQL

## Explanation - how it works

This set of example applications features use Nx to wire up enter project
dependencies during development. Following the Nx convention, they are divided
into "apps" and "libs".

There is a many-to-many relatioship between applications and modules, and
modules can use other modules.

In addition, there is a "servers" directory intended to contain one or more
server-side example code bases that support the Angular example. These are not
managed using Nx, which is Angular specific. However, in a sprawling set of
related servers and libraries, Lerna could be used too much the same effect.

### Example application

The example applications are not very complex - certainly not complex enough to
warrant the amount of complexity used to build it. Real application of this
modest complexity could easily be written as a single project (each).

Still, the example applications reuse blocks of functionality, so they show the
value of this multi-package approach.

There are three application to run:

* Admin - bundles 5 feature modules
* Agent - bundles 2 feature module
* Portal - bundles 1 feature module

To understand how they are cross wired, look at the tsconfig.json file for each.

Two of the modules use ngrx/store for state management, With appropriate lazy
loading of feature modules.

### Running the example applications

In one window:

```
yarn
yarn start
# add --app=agent or --app=portal if desired
```

In another window:

```
cd servers/node
yarn
yarn start
```

## Contact us

Main author: [Kyle Cordes](http://kylecordes.com/)

Much help from the team at: [Oasis Digital](https://oasisdigital.com/)

... who teach [Angular Boot Camp](https://angularbootcamp.com/)
