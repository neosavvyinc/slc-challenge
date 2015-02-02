var prompt = require('prompt');
var when = require('when');
var _ = require("lodash-node");
var fs = require("fs");
var uploadImages = require("./upload-images");

var S3_BASE = '//s3-us-west-2.amazonaws.com/slcchallenge/images/';

prompt.start();
prompt.get(['name', 'brewery', 'description', 'url', 'image'], function (err, result) {
  var existingDb = JSON.parse(fs.readFileSync('./data/db.json', 'utf-8'));

  result.image = S3_BASE + result.image;
  existingDb.beers.push(result);

  fs.writeFileSync('./data/db.json', JSON.stringify(existingDb));

  uploadImages();
});


