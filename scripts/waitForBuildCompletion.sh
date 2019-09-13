#!/bin/bash
buildUrl=$1
timeout=60

echo "Checking for build ${buildUrl}"
node_modules/expo-cli/bin/expo.js build:status > buildStatus.txt

while [ $(grep -A1 $buildUrl buildStatus.txt | grep -o "Build in progress...\|Build waiting in queue..." | wc -l) == "1" ]; do
  timeout=$[ $timeout - 1 ]
  if [ $timeout -lt 1 ]; then
    echo "Build did not complete."
    exit -1
  fi
  echo "Waiting for build to complete..."
  sleep 30
  node_modules/expo-cli/bin/expo.js build:status > buildStatus.txt
done
echo "Build finished!"
exit 0