#!/bin/bash

echo ""
echo "----------------------------------------"
echo "-------------- Build IPA ---------------"
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
echo "------- Starting App (IPA) build -------"
echo "----------------------------------------"
echo ""
node_modules/expo-cli/bin/expo.js build:ios --release-channel prod --no-publish --no-wait >buildOutput.txt 2>&1
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
    node_modules/expo-cli/bin/expo.js build:ios --release-channel prod --no-publish --no-wait >buildOutput.txt 2>&1
    cat buildOutput.txt
done

echo ""
echo "----------------------------------------"
echo "------ Monitoring App (IPA) build ------"
echo "----------------------------------------"
echo ""
buildUrl=`grep "https://expo.io/dashboard/${EXPO_USERNAME}/builds/" buildOutput.txt`
echo "Build URL is $buildUrl"
bash scripts/waitForBuildCompletion.sh $buildUrl

echo ""
echo "----------------------------------------"
echo "---------- Download built IPA ----------"
echo "----------------------------------------"
echo ""
node_modules/expo-cli/bin/expo.js build:status > buildStatus.txt
ipaUrl=`grep -A5 $buildUrl buildStatus.txt | grep "IPA: https:"`
ipaUrl=${ipaUrl/"IPA: "/""}
curl ${ipaUrl} > uwhelper.ipa

echo ""
echo "----------------------------------------"
echo "---- Upload App (IPA) to app store -----"
echo "----------------------------------------"
echo ""
bundle install
bundle exec fastlane pilot upload -u $APPLE_USER --apple_id $APPLE_APP_ID --skip_waiting_for_build_processing true --ipa uwhelper.ipa &
uploadPID=$!
timeout=60
while kill -0 $uploadPID ; do
    timeout=$[ $timeout - 1 ]
    if [ $timeout -lt 1 ]; then
        echo "Upload did not complete in time."
        exit -1
    fi
    echo "Waiting for upload to complete..."
    sleep 30
done