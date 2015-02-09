var _ = require("lodash-node");
var prompt = require('prompt');
var uploadImages = require("./upload-images");
var optimizeImages = require("./optimize-images");
var Firebase = require('firebase');

var ref = new Firebase('https://slcchallenge.firebaseio.com/');
var S3_BASE = '//s3-us-west-2.amazonaws.com/slcchallenge/images/';

prompt.start();
prompt.get(['name', 'brewery', 'description', 'url', 'image'], function (err, result) {

  //Set image
  result.image = S3_BASE + result.image;

  //Get the last index in the collection
  ref.child('beers').once('value', function (snapshot) {
    var length = snapshot.val().length;

    ref.child('beers').child(String(length)).set(result);

    optimizeImages().then(uploadImages);
  });

});


