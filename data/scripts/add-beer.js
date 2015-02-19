var _ = require("lodash-node");
var prompt = require('prompt');
var uploadImages = require("./upload-images");
var optimizeImages = require("./optimize-images");
var Firebase = require('firebase');

var ref = new Firebase('https://brewnity.firebaseio.com/');
var S3_BASE = '//s3-us-west-2.amazonaws.com/slcchallenge/images/';

prompt.start();
prompt.get(['name', 'brewery', 'description', 'url', 'image'], function (err, result) {

  //Set image
  if (result.image) {
    result.image = S3_BASE + result.image;
  }

  //Get the last index in the collection
  ref.child('beers').once('value', function (snapshot) {
    var val = snapshot.val();
    var length = val.length;

    if (!result.brewery) {
      result.brewery = _.last(val).brewery;
    }
    if (!result.url) {
      result.url = _.last(val).url;
    }

    ref.child('beers').child(String(length)).set(result);

    if (result.image && result.image !== _.last(val).image) {
      optimizeImages().then(uploadImages);
    } else {
      ref.once('value', function () {
        process.exit();
      });
    }
  });

});


