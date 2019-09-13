#!/bin/bash
buildUrl=$1
timeout=60

echo "Checking for build ${buildUrl}"

while [ $(expo build:status | grep -A1 $buildUrl | grep -o "Build in progress...\|Build waiting in queue..." | wc -l) == "1" ]; do
  timeout=$[ $timeout - 1 ]
  if [ $timeout -lt 1 ]; then
    echo "Build did not complete."
    exit -1
  fi
  echo "Waiting for build to complete..."
  sleep 30
done
echo "Build finished!"
exit 0