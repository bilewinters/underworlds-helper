#!/bin/bash
if [ $ARCH == "android" ]; then
    echo "### Build android ###"
    yarn
    echo "Build number $TRAVIS_BUILD_NUMBER"
    node updateBuildNumber.js $TRAVIS_BUILD_NUMBER
    node updateVersionNumber.js $TRAVIS_BUILD_NUMBER
    node_modules/expo-cli/bin/expo.js login -u $EXPO_USERNAME -p $EXPO_PASSWORD
    node_modules/expo-cli/bin/expo.js publish --release-channel prod --non-interactive
    node_modules/expo-cli/bin/expo.js build:android --release-channel prod --no-publish --no-wait > buildOutput.txt
    cat buildOutput.txt
    buildUrl=`grep "https://expo.io/builds/" buildOutput.txt`
    echo "Checking status of build $buildUrl"
    bash build/waitForBuildCompletion.sh $buildUrl
    echo "$PLAY_JSON_KEY" | base64 --decode > /tmp/play_key.json
    node_modules/expo-cli/bin/expo.js upload:android --key /tmp/play_key.json
fi

if [ $ARCH == "ios" ]; then
    echo "### Build iOS ###"
fi
