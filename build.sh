#!/bin/bash
set -e

yarn run clean
yarn
yarn run both

echo "success"
