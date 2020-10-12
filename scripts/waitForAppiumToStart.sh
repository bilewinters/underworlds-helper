#!/bin/bash
logFile=$1
timeout=60

echo "Waiting for Appium to start..."
while [ $([ -f "${logFile}" ] && grep "Appium REST http interface listener started" ${logFile} | wc -l) == "0" ]; do
  timeout=$[ $timeout - 1 ]
  if [ $timeout -lt 1 ]; then
    echo "Appium not yet started"
    exit -1
  fi
  echo "Waiting for Appium to start..."
  sleep 30
done
echo "Appium started!"
exit 0