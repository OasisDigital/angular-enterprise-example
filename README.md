# Large Angular application structure example

## Work in progress

This is a work in progress. Likely to have many changes over time,
particularly as all of the tools improve.

## Goals

1. Accomodate sprawling Angular applications - and collections of applications
   with partially overlapping code behind them.
2. Manage complexity, size, and scale.
3. Use Angular CLI to the extent possible.
4. Bend tools designed for a simple application with a single codebase, to work
   acceptably with more than that.

## Explanation - how it works (so far)

This technique uses Lerna to wire up interproject dependencies. This is an
atypical use of Lerna, which exists primarily to support **publishing** a set of
related projects. Here we are not publishing at all, but rather using Lerna only
for cross-project linking. It is not yet clear whether the Lerna maintainers
endorse or tolerate this (mis?)use of Lerna.

The (family of related applications) is decomposed in to:

* Several top-level applications, in the `application` directory.
* Some modules, in the `module` directory.
* One or more servers, in the `server` directory.

There is a many-to-many relatioship between applications and modules, and
modules can use other modules.

Lerna wires up the dependencies using symlinks.

### Example application

The example applications are not very complex - certainly not complex enough to
warrant the amount of complexity used to build it. Real application of this
modest complexity would be best structured in a simpler way.

Still, the example applications reuse blocks of functionality, so they
illustrate the point of this multi-package approach.

There are two application to run:

* Admin - bundles two feature modules
* Portal - bundles one feature module

The feature modules, as well as some other modules they depend on, are all in
the module directory.

To understand the automatic lacing together of dependencies, study the
`package.json` file of each module, in particular the dependencies. Note the
dependencies look like this:

```
    "@oasisdigital/employee-display": "*"
```

Such dependencies refer to other packages part of the same application suite.

Many of the chunks of functionality in the example applications are similar to
code examples we use in Angular Boot Camp:

https://angularbootcamp.com/

... Lightly repurposed and rearranged for use in this example.


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

## Issues and annoyances (TODO)

General fragility.

A -> B, B -> C, A must declare a dependency on C for it to work. This is because
B gets compiled in A's context. Ideally this would be eliminated - but in the
meantime it could be automated.

Not a standard use case for CLI and other Angular tooling, so error messages are
often unhelpful.

Example only shows how to run the applications as a whole. I have in mind a
mechanism to include a small amount of boilerplate around each module, and get a
way to run (not just compile) individual modules outside an app context.

The server provides a "push" data flow, using SSE - TODO, add a client module to
show this data in use.

Probably more.

## Contact us

Main author:

Kyle Cordes, http://kylecordes.com/

Much help from the rest of the team at:

Oasis Digital, https://oasisdigital.com/

Angular Boot Camp, https://angularbootcamp.com/
