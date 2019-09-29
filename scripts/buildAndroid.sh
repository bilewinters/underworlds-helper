#!/bin/bash

echo ""
echo "----------------------------------------"
echo "-------------- Build APK ---------------"
echo "----------------------------------------"
echo ""
npm install
echo "Build number $TRAVIS_BUILD_NUMBER"
node updateBuildNumber.js $TRAVIS_BUILD_NUMBER
node updateVersionNumber.js $TRAVIS_BUILD_NUMBER

echo ""
echo "----------------------------------------"
echo "---------- Logging in to expo ----------"
echo "----------------------------------------"
echo ""
node_modules/expo-cli/bin/expo.js login -u $EXPO_USERNAME -p $EXPO_PASSWORD

echo ""
echo "----------------------------------------"
echo "------- Starting App (AAB) build -------"
echo "----------------------------------------"
echo ""
node_modules/expo-cli/bin/expo.js build:android --release-channel prod --no-publish --no-wait -t app-bundle >buildOutput.txt 2>&1
cat buildOutput.txt

timeout=60
while [ $(grep -o "Build started, it may take a few minutes" buildOutput.txt | wc -l) == "0" ]; do
    timeout=$[ $timeout - 1 ]
    if [ $timeout -lt 1 ]; then
        echo "Unable to start build. Aborting."
        exit -1
    fi
    echo "Build did not start. Trying again after a short wait..."
    sleep 30
    node_modules/expo-cli/bin/expo.js build:android --release-channel prod --no-publish --no-wait -t app-bundle >buildOutput.txt 2>&1
    cat buildOutput.txt
done

echo ""
echo "----------------------------------------"
echo "------ Monitoring App (AAB) build ------"
echo "----------------------------------------"
echo ""
buildUrl=`grep "https://expo.io/builds/" buildOutput.txt`
echo "Build URL is $buildUrl"
bash scripts/waitForBuildCompletion.sh $buildUrl

echo ""
echo "----------------------------------------"
echo "---------- Download built AAB ----------"
echo "----------------------------------------"
echo ""
node_modules/expo-cli/bin/expo.js build:status > buildStatus.txt
aabUrl=`grep -A5 $buildUrl buildStatus.txt | grep "APK: https:"`
aabUrl=${aabUrl/"APK: "/""}
curl ${aabUrl} > uwhelper.aab

echo ""
echo "----------------------------------------"
echo "---- Upload App (AAB) to Play store ----"
echo "----------------------------------------"
echo ""
echo "$PLAY_JSON_KEY" | base64 --decode > /tmp/play_key.json
node_modules/expo-cli/bin/expo.js upload:android --key /tmp/play_key.json --path uwhelper.aab --track alpha
