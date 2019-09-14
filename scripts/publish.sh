#!/bin/bash

echo ""
echo "----------------------------------------"
echo "------------- Publish JS ---------------"
echo "----------------------------------------"
echo ""
yarn
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
echo "--- Publishing new Javascript bundle ---"
echo "----------------------------------------"
echo ""
node_modules/expo-cli/bin/expo.js publish --release-channel prod --non-interactive
