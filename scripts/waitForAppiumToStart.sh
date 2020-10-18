#!/bin/bash
logFile=$1
timeout=60

echo "Waiting for Appium to start, checking ${logFile}..."

while [ $(grep -A1 "Appium REST http interface listener started" ${logFile} | wc -l) == "0" ]; do
  timeout=$[ $timeout - 1 ]
  if [ $timeout -lt 1 ]; then
    echo "Appium not yet started."
    cat ${logFile}
    exit -1
  fi
  echo "Waiting for Appium to start..."
  sleep 30
done
echo "Appium started!"
cat ${logFile}
exit 0