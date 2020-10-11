#!/bin/bash
echo ""
echo "----------------------------------------"
echo "------------- Screenshots --------------"
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
echo "------- Starting App (APP) build -------"
echo "----------------------------------------"
echo ""
node_modules/expo-cli/bin/expo.js build:ios --release-channel prod --no-publish --no-wait -t simulator >buildOutput.txt 2>&1
cat buildOutput.txt

timeout=60
while [ $(grep -o "Build started, it may take a few minutes" buildOutput.txt | wc -l) == "0" ]; do
    timeout=$[ $timeout - 1 ]
    if [ $timeout -lt 1 ]; then
        echo "Unable to start simulator build. Aborting."
        exit -1
    fi
    echo "Simulator build did not start. Trying again after a short wait..."
    sleep 30
    node_modules/expo-cli/bin/expo.js build:ios --release-channel prod --no-publish --no-wait -t simulator >buildOutput.txt 2>&1
    cat buildOutput.txt
done

echo ""
echo "----------------------------------------"
echo "------ Monitoring App (APP) build ------"
echo "----------------------------------------"
echo ""
buildUrl=`grep "https://expo.io/dashboard/${EXPO_USERNAME}/builds/" buildOutput.txt`
echo "Build URL is $buildUrl"
bash scripts/waitForBuildCompletion.sh $buildUrl

echo ""
echo "----------------------------------------"
echo "---------- Download built APP ----------"
echo "----------------------------------------"
echo ""
node_modules/expo-cli/bin/expo.js build:status > buildStatus.txt
tarUrl=`grep -A5 $buildUrl buildStatus.txt | grep "IPA: https:"`
tarUrl=${tarUrl/"IPA: "/""}
curl ${tarUrl} > uwhelper-simulator.tar.gz
gunzip -c uwhelper-simulator.tar.gz | tar xopf -
appLoacation=`pwd`
appLocation="${appLocation}/uwhelper.app"

echo "----------------------------------------"
echo "------------- Start Appium -------------"
echo "----------------------------------------"
npx appium &>! appium.log &
appiumPID=$!
echo "Give everything a moment to start..."
sleep 10

echo "----------------------------------------"
echo "------------ Run Screenshots -----------"
echo "----------------------------------------"
DEVICE_NAME="iPhone 11 Pro Max" APP_LOCATION=${appLocation} npm run screenshots
DEVICE_NAME="iPhone 8 Plus" APP_LOCATION=${appLocation} npm run screenshots
DEVICE_NAME="iPad Pro (12.9-inch) (3rd generation)" APP_LOCATION=${appLocation} npm run screenshots

echo "----------------------------------------"
echo "------------- Appium Output ------------"
echo "----------------------------------------"
kill -9 $appiumPID
cat appium-log.txt
ls -hal "marketing/screenshots/iPhone 11 Pro Max"
ls -hal "marketing/screenshots/iPhone 8 Plus"
ls -hal "marketing/screenshots/iPad Pro (12.9-inch) (3rd generation)"

echo "Not actually doing anything with these screenshots currently!"
echo "You should probably upload them somewhere :-)"