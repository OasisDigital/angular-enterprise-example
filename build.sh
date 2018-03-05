#!/bin/bash
set -e

yarn run ng build --prod -a portal
yarn run ng build --prod -a agent
yarn run ng build --prod -a admin

yarn run lint

yarn run compodoc
