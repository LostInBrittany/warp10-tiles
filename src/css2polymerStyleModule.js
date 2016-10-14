/**
@author Horacio Gonzalez (@lostinbrittany)
@copyright (c) 2016 Cityzen Data
@license Apache 2.0
*/
var  fs = require('fs-extra');

if (process.argv.length < 4) {
  console.log("Use: node css2PolymerStyleModule.js CSS_SOURCE_FILE TARGET_FOLDER\n");
  process.exit();  
}

var cssFile = process.argv[2];

var targetFolder = process.argv[3];

var elementName = function(filename) {
  return filename.replace('.css', '').replace('.min','-min');
}

var getHeader = function(filename) {
  
  return `<!--
@author Horacio Gonzalez (@lostinbrittany)
@copyright (c) 2016 Cityzen Data
@license Apache 2.0
-->

<link rel="import" href="../font-roboto/roboto.html">
<dom-module is="${elementName(filename)}">
<template>
<style>
`;
}
var getFooter = function() {
  return `\n</style></template></dom-module>`;
}

fs.ensureDirSync(targetFolder);
 
var splittedPath = cssFile.split('/');
var filename = splittedPath[splittedPath.length-1];
 
var data = fs.readFileSync(cssFile, "utf8"); 
var out = getHeader(filename) + data + getFooter();

fs.writeFileSync(`${targetFolder}/${elementName(filename)}.html`, out);

  