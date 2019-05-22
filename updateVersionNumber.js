const fs = require('fs');
const appInfo = require('./app.json');

appInfo.expo.ios.buildNumber = `${process.argv[2]}`;
appInfo.expo.android.versionCode = parseInt(`${process.argv[2]}`, 10);

fs.writeFileSync('./app.json', JSON.stringify(appInfo));
