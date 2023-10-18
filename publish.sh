#!/usr/bin/env bash

npm run build

cp src/types.d.ts dist

npm publish --dry-run