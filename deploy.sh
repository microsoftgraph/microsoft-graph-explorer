#!/usr/bin/env bash

if [ $Build.SourceBranchName == 'dev' ]
  then
    npm run build:prod
    npm run stage
fi


