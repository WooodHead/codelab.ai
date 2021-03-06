#!/usr/bin/env bash

set -v

docker run \
  --name codelab \
  --expose 3000 \
  --publish 3000:3000 \
  --env WEB_PORT=3000 \
  --env NEXT_PUBLIC_API_ORIGIN=http://localhost:4000 \
  --env NEXT_PUBLIC_API_PATHNAME=api/v1 \
  codelabai/codelab:0.01 \
  yarn start:prod:web
