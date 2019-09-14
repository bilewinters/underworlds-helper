#!/bin/bash

echo ""
echo "----------------------------------------"
echo "------------- Build binary -------------"
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

if [ $1 == "android" ]; then
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
    echo "---- Upload App (APK) to Play store ----"
    echo "----------------------------------------"
    echo ""
    echo "$PLAY_JSON_KEY" | base64 --decode > /tmp/play_key.json
    node_modules/expo-cli/bin/expo.js upload:android --key /tmp/play_key.json
fi

if [ $1 == "ios" ]; then
    # echo ""
    # echo "----------------------------------------"
    # echo "------- Starting App (IPA) build -------"
    # echo "----------------------------------------"
    # echo ""
    # node_modules/expo-cli/bin/expo.js build:ios --release-channel prod --no-publish --no-wait > buildOutput.txt
    # cat buildOutput.txt
    # if [ $(grep -o "Build started, it may take a few minutes" buildOutput.txt | wc -l) == "0" ]; then
    #     echo "Build did not start successfully. Aborting."
    #     exit -1
    # fi

    # echo ""
    # echo "----------------------------------------"
    # echo "------ Monitoring App (IPA) build ------"
    # echo "----------------------------------------"
    # echo ""
    # buildUrl=`grep "https://expo.io/builds/" buildOutput.txt`
    # echo "Build URL is $buildUrl"
    # bash scripts/waitForBuildCompletion.sh $buildUrl

    echo ""
    echo "----------------------------------------"
    echo "---- Upload App (IPA) to app store -----"
    echo "----------------------------------------"
    echo ""
    # node_modules/expo-cli/bin/expo.js upload:ios

    ipaUrl=`node_modules/expo-cli/bin/expo.js url:ipa`
    curl ${ipaUrl} > uwhelper.ipa

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

fi
