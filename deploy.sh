#!/usr/bin/env bash

echo "*****"
echo $Build.SourceBranchName
echo "*****"
if [ $Build.SourceBranchName == "dev" ]
  then
    npm run build:prod
    npm run stage

  echo  "Staged changes"
fi


