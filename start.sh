#!/usr/bin/env bash
NODE_ENV=production UV_THREADPOOL_SIZE=10 nohup node ./server/app.js >> ./shared/nodeStd/node.stdout.$(date +%Y-%m-%d).log 2>>./shared/nodeStd/node.stderr.log &
