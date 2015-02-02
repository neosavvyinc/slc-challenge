(function () {
  var s3 = require('s3');
  var fs = require('fs');

  module.exports = function () {
    var params = {
      localDir: './data/images',
      deleteRemoved: true,
      s3Params: {
        Bucket: 'slcchallenge',
        Prefix: 'images/'
      }
    };

    fs.readFile('./s3-credentials.json', 'utf-8', function (err, data) {
      console.log(data);

      var client = s3.createClient({
        s3Options: JSON.parse(data)
      });
      var uploader = client.uploadDir(params);
      uploader.on('error', function(err) {
        console.error('unable to sync:', err.stack);
        process.exit();
      });
      uploader.on('progress', function() {
        console.log('progress', uploader.progressAmount, uploader.progressTotal);
      });
      uploader.on('end', function() {
        console.log('done uploading');
        process.exit();
      });
    });


  };
})();

