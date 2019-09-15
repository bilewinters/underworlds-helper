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
echo "------- Starting App (APK) build -------"
echo "----------------------------------------"
echo ""
node_modules/expo-cli/bin/expo.js build:android --release-channel prod --no-publish --no-wait > buildOutput.txt
cat buildOutput.txt
if [ $(grep -o "Build started, it may take a few minutes" buildOutput.txt | wc -l) == "0" ]; then
    echo "Build did not start successfully. Aborting."
    exit -1
fi

echo ""
echo "----------------------------------------"
echo "------ Monitoring App (APK) build ------"
echo "----------------------------------------"
echo ""
buildUrl=`grep "https://expo.io/builds/" buildOutput.txt`
echo "Build URL is $buildUrl"
bash scripts/waitForBuildCompletion.sh $buildUrl

echo ""
echo "----------------------------------------"
echo "---------- Download built APK ----------"
echo "----------------------------------------"
echo ""
node_modules/expo-cli/bin/expo.js build:status > buildStatus.txt
apkUrl=`grep -A5 $buildUrl buildStatus.txt | grep "APK: https:"`
apkUrl=${apkUrl/"APK: "/""}
curl ${apkUrl} > uwhelper.apk

echo ""
echo "----------------------------------------"
echo "---- Upload App (APK) to Play store ----"
echo "----------------------------------------"
echo ""
echo "$PLAY_JSON_KEY" | base64 --decode > /tmp/play_key.json
node_modules/expo-cli/bin/expo.js upload:android --key /tmp/play_key.json --path uwhelper.apk