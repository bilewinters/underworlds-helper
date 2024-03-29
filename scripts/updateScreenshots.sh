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
appLocation=`pwd`
appLocation="${appLocation}/uwhelper.app"
echo "appLocation = ${appLocation}"

echo "----------------------------------------"
echo "------------- Start Appium -------------"
echo "----------------------------------------"
node node_modules/appium/build/lib/main.js > appium.log &
appiumPID=$!
echo "Appium process ID: ${appiumPID}"
bash scripts/waitForAppiumToStart.sh appium.log

echo "----------------------------------------"
echo "------------ Run Screenshots -----------"
echo "----------------------------------------"
cp assets/fonts/SavaPro-Semibold.otf ~/Library/Fonts
DEVICE_NAME="iPhone 11 Pro Max" IMAGE_PREFIX="APP_IPHONE_55" APP_LOCATION=${appLocation} npm run screenshots
DEVICE_NAME="iPhone 8 Plus" IMAGE_PREFIX="APP_IPHONE_65" APP_LOCATION=${appLocation} npm run screenshots
DEVICE_NAME="iPad Pro (12.9-inch) (4th generation)" IMAGE_PREFIX="APP_IPAD_PRO_4GEN_129" APP_LOCATION=${appLocation} npm run screenshots
DEVICE_NAME="iPad Pro (11-inch) (2nd generation)" IMAGE_PREFIX="APP_IPAD_PRO_11" APP_LOCATION=${appLocation} npm run screenshots

echo "----------------------------------------"
echo "------------- Appium Output ------------"
echo "----------------------------------------"
kill -9 $appiumPID
ls -hal "screenshots/en-GB"

echo "Not actually doing anything with these screenshots currently!"
echo "You should probably upload them somewhere :-)"

echo "----------------------------------------"
echo "-------------- Appium Logs -------------"
echo "----------------------------------------"
# cat appium.log