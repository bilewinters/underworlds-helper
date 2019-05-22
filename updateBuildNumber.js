const fs = require('fs');
const buildInfo = require('./buildInfo.json');

buildInfo.buildNumber = `${process.argv[2]}`;
fs.writeFileSync('./buildInfo.json', JSON.stringify(buildInfo));
