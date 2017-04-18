# Large Angular application structure example

[![Build Status](https://travis-ci.org/OasisDigital/scalable-enterprise-angular.svg?branch=master)](https://travis-ci.org/OasisDigital/scalable-enterprise-angular)

This is a work in progress. It is likely to have many changes over time,
particularly as all of the tools improve.

## Goals

1. Accomodate sprawling Angular applications - and collections of applications
   with partially overlapping code behind them.
2. Manage complexity, size, and scale.
3. Use Angular CLI to the extent possible.
4. Bend tools designed for a simple application with a single codebase, to work
   acceptably with more than that.

## Technologies used

* Angular 4
* Angular CLI
* NgRx/Store, Store addons, including dev-tools and freeze
* Lerna
* RxJS, not only as a dependency of Angular
* Lodash, Moment

## Explanation - how it works (so far)

This example uses Lerna to wire up interproject dependencies. This is an
atypical use of Lerna, which exists primarily to support **publishing** a set of
related projects. Here we are not publishing at all, but rather using Lerna only
for cross-project linking. It is not yet clear whether the Lerna maintainers
endorse or tolerate this (mis?)use of Lerna.

A family of related applications is decomposed to:

* Several top-level applications, in the `application` directory.
* Some modules, in the `module` directory.
* One or more servers, in the `server` directory.

There is a many-to-many relatioship between applications and modules, and
modules can use other modules. Lerna wires up the dependencies using symlinks.

### 4 Layers / bins

A family of applications is divided in to many modules, which are then organized
into 4 layers / bins:

* Applications
* Top-level features (which should be lazy loaded - TODO)
* Modules used by both features, and by server code
* Server(s)

### Example application

The example applications are not very complex - certainly not complex enough to
warrant the amount of complexity used to build it. Real application of this
modest complexity could easily be written as a single project (each).

Still, the example applications reuse blocks of functionality, so they show the
value of this multi-package approach.

There are two application to run:

* Admin - bundles three feature modules
* Portal - bundles one feature module

The feature modules, as well as some other modules they depend on, are in the
module directory.

To understand the automatic lacing together of dependencies, study the
`package.json` file of each module, in particular the dependencies. Note the
dependencies look like this:

```
    "@oasisdigital/employee-display": "*"
```

Such dependencies refer to other packages, part of the same application suite.

Many of the chunks of functionality in the example applications are similar to
code examples we use in Angular Boot Camp:

https://angularbootcamp.com/

...repurposed and rearranged for use in this example.

Two of the modules use ngrx/store for state management, with the admin
application showing how to unite them both into the same store.

### Running the example applications

```
yarn
yarn run build
yarn run portal
# use user portal for a while
^C

yarn run admin
# use admin app for a while
```

### Tips for working with this code

Lerna doesn't (yet) do a great job updating dependencies and cross-links to keep
up with incremental package changes. If you make changes then have trouble, this
usually helps:

```
yarn run clean
yarn
```

## Issues, Annoyances, TODOs

... in the [issue tracker](https://github.com/OasisDigital/scalable-enterprise-angular/issues)

Also, as this is not the normal vanilla use case for CLI and other Angular
tooling, error messages are sometimes unhelpful. That probably can't be fixed in
this code, but should improve as CLI continues to be used in more different
situations and continues to improve.

## Contact us

Main author: [Kyle Cordes](http://kylecordes.com/)

Much help from the team at: [Oasis Digital](https://oasisdigital.com/)

... who teach [Angular Boot Camp](https://angularbootcamp.com/)
